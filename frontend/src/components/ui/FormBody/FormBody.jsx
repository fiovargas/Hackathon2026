import React from 'react';

const FormBody = ({
  wrapperClassName,
  cardClassName,
  logo,
  logoClassName,
  title,
  titleClassName,
  subtitle,
  subtitleClassName,
  formClassName,
  onSubmit,
  noValidate = true,
  children,
  footer,
}) => (
  <div className={wrapperClassName}>
    <div className={cardClassName}>
      {logo && <div className={logoClassName}>{logo}</div>}
      {title && <h2 className={titleClassName}>{title}</h2>}
      {subtitle && <p className={subtitleClassName}>{subtitle}</p>}

      <form
        className={formClassName}
        onSubmit={onSubmit}
        noValidate={noValidate}
      >
        {children}
      </form>

      {footer}
    </div>
  </div>
);

export default FormBody;
