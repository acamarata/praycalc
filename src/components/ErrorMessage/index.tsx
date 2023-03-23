import styles from './styles.module.css';

interface ErrorMessageProps {
  message: string;
  isError?: boolean;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, isError = true }) => {
  if (!message) {
    return <div className={styles.container}></div>;
  }

  return (
    <div className={styles.container}>
      <p className={isError ? styles.errorText : styles.helperText}>{message}</p>
    </div>
  );
};

export default ErrorMessage;