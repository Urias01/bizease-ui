export function formatPhoneNumber(phone: string) {
  const cleaned = ('' + phone).replace(/\D/g, '');

  const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }

  return phone; // Retorna o número não formatado caso não coincida com o padrão
}
