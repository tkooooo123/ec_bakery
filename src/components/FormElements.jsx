import propTypes from 'prop-types'
export const Input = ({ id, labelText, register, type, errors, rules, placeholder, value }) => {
  return (
    <>
      <label htmlFor={id} className='form-label'>
        {labelText}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        className={`form-control ${errors[id] && 'is-invalid'}`}
        {...register(id, rules)}
      />
      {errors[id] && (
        <div className='invalid-feedback'>{errors[id]?.message}</div>
      )}
    </>
  );
};

export const CheckboxRadio = ({
  id,
  labelText,
  register,
  type,
  errors,
  rules,
  value,
  name,
}) => {
  return (
    <>
      <div className='form-check'>
        <input
          className={`form-check-input ${errors[name] && 'is-invalid'}`}
          type={type}
          name={name}
          id={id}
          value={value}
          {...register(name, rules)}
        />
        {/* Radio 使用 Name 欄位 */}
        <label className='form-check-label' htmlFor={id}>
          {labelText}
        </label>
        {errors[name] && (
          <div className='invalid-feedback'>{errors[name]?.message}</div>
        )}
      </div>
    </>
  );
};

export const Textarea = ({ id, labelText, register, type, errors, rules, rows }) => {
  return (
    <>
      <label htmlFor={id} className='form-label'>
        {labelText}
      </label>
      <textarea
        id={id}
        type={type}
        rows={rows}
        className={`form-control  ${errors[id] && 'is-invalid'}`}
        {...register(id, rules)}
      />
      {errors[id] && (
        <div className='invalid-feedback'>{errors[id]?.message}</div>
      )}
    </>
  );
};
export const Select = ({
  id,
  labelText,
  register,
  errors,
  rules,
  children,
  disabled = false,
}) => {
  return (
    <>
      <label htmlFor={id} className='form-label'>
        {labelText}
      </label>
      <select
        id={id}
        className={`form-select ${errors[id] && 'is-invalid'}`}
        {...register(id, rules)}
        disabled={disabled}
      >
        {children}
      </select>
      {errors[id] && (
        <div className='invalid-feedback'>{errors[id]?.message}</div>
      )}
    </>
  );
};

Input.propTypes = {
 id: propTypes.string,
 labelText: propTypes.string,
 register: propTypes.func,
 type: propTypes.string,
 errors: propTypes.object,
 rules: propTypes.object,
 placeholder: propTypes.string,
 value: propTypes.string
}

CheckboxRadio.propTypes = {
  id: propTypes.string,
 labelText: propTypes.string,
 register: propTypes.func,
 type: propTypes.string,
 errors: propTypes.object,
 rules: propTypes.object,
 value: propTypes.string,
 name: propTypes.string,
}

Textarea.propTypes = {
  id: propTypes.string,
 labelText: propTypes.string,
 register: propTypes.func,
 type: propTypes.string,
 errors: propTypes.object,
 rules: propTypes.object,
 rows: propTypes.string,
}

Select.propTypes = {
  id: propTypes.string,
 labelText: propTypes.string,
 register: propTypes.func,
 type: propTypes.string,
 errors: propTypes.object,
 rules: propTypes.object,
 children: propTypes.array,
 disabled: propTypes.bool,
}