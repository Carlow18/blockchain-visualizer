export default function ValidationBanner({ valid }) {
  return (
    <div className={`validation-banner ${valid ? 'chain-valid' : 'chain-invalid'}`}>
      <span className="validation-icon">{valid ? '✅' : '🚨'}</span>
      <span className="validation-text">
        {valid ? 'Chain Valid' : 'Chain Invalid'}
      </span>
    </div>
  );
}
