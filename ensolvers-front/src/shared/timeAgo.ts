export function timeAgo(dateStr: Date): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffInMilliseconds = now.getTime() - date.getTime();

  const seconds = Math.floor(diffInMilliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) {
    return `hace ${years} ${years === 1 ? "año" : "años"}`;
  } else if (months > 0) {
    return `hace ${months} ${months === 1 ? "mes" : "meses"}`;
  } else if (days > 0) {
    return `hace ${days} ${days === 1 ? "día" : "días"}`;
  } else if (hours > 0) {
    return `hace ${hours} ${hours === 1 ? "hora" : "horas"}`;
  } else if (minutes > 0) {
    return `hace ${minutes} ${minutes === 1 ? "minuto" : "minutos"}`;
  } else {
    return `hace unos segundos`;
  }
}
