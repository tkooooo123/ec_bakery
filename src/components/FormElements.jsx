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
