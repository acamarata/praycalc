import styles from './styles.module.css';

interface ErrorMessageProps {
  message: string;
  isError?: boolean; // Add this
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, isError = true }) => {
  return <div id="search-help" className={isError ? styles.error : styles.message}>{message}</div>;
};

export default ErrorMessage;
