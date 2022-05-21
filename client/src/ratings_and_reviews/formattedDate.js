function formattedDate(date) {

  date = new Date(date);

  let options = {
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  };

  date = new Intl.DateTimeFormat('en-US', options).format(date);

  return date;
}

export default formattedDate;