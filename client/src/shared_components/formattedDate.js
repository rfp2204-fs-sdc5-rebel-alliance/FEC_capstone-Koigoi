function formattedDate(date) {

  date = new Date(date);

  const options = {
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  };

  date = new Intl.DateTimeFormat('en-US', options).format(date);

  return date;
}

export default formattedDate;