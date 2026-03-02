from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError

from .models import Company, InstitutionFormation, User

ENTITY_MODELS = {
    "user": User,
    "company": Company,
    "institution": InstitutionFormation,
}


def get_entity(entity_type, entity_id):
    model = ENTITY_MODELS.get(entity_type)
    if not model:
        raise InvalidToken("Invalid entity type")
    try:
        return model.objects.get(id=entity_id, is_active=True)
    except model.DoesNotExist:
        raise InvalidToken("Entity not found or inactive")


class CookieJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        raw_token = request.COOKIES.get("access_token")
        if not raw_token:
            return None

        try:
            validated_token = self.get_validated_token(raw_token)
            entity_type = validated_token["entity_type"]
            entity_id = validated_token["entity_id"]
        except (TokenError, KeyError):
            return None

        entity = get_entity(entity_type, entity_id)
        return entity, validated_token
