export function showAlert(
  message,
  type = 'info',
  functionToCall = null,
  timeout = 1000
) {
  const alertClasses = {
    info: 'bg-blue-100 border-blue-500 text-blue-700',
    success: 'bg-green-200 border-green-600 text-green-800',
    error: 'bg-red-100 border-red-500 text-red-700',
  };

  const alertDiv = document.createElement('div');
  alertDiv.className = `w-full max-w-md mx-auto p-4 border rounded-lg shadow-md ${alertClasses[type]}`;
  alertDiv.textContent = message;

  const alertContainer = document.getElementById('alert-container');
  alertContainer.appendChild(alertDiv);

  setTimeout(() => {
    alertDiv.remove();
    functionToCall();
  }, timeout);
}
