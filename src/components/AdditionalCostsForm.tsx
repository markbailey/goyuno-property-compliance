import { ChangeEvent, FormEvent as ReactFormEvent, useState } from 'react';
import css from '../assets/stylesheets/adf.module.css';

type FormEvent = ReactFormEvent<HTMLFormElement>;
interface AdditionalCostsFormProps {
  onSubmit: (event: FormEvent, cost: number) => void;
}

function AdditionalCostsForm(props: AdditionalCostsFormProps) {
  const [cost, setCost] = useState<string>('');
  const { onSubmit, ...otherProps } = props;

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) =>
    setCost(event.target.value);

  const onFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    const confirmed = window.confirm(
      `Are you sure you wish to add £${cost} of additional costs?`
    );

    if (confirmed && typeof onSubmit === 'function')
      onSubmit(event, parseFloat(cost || '0'));

    setCost('');
  };

  return (
    <form {...otherProps} onSubmit={onFormSubmit}>
      <label className={css.label}>Enter additional compliance costs:</label>
      <div className={css.inputGroup}>
        <input
          type="number"
          placeholder="0.00"
          className={css.input}
          min={0}
          value={cost}
          onChange={onInputChange}
        />

        <button type="submit" className={css.button} disabled={cost === ''}>
          Calculate
        </button>
      </div>
    </form>
  );
}

export default AdditionalCostsForm;
