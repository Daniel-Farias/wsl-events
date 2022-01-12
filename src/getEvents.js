module.exports = async function (page, url) {
  page.goto(url, {
    waitUntil: 'networkidle2'
  });

  await page.waitForSelector('div.events-schedule-table');
    
  const eventsTotal = await page.evaluate(() => {
    const table = document.querySelectorAll("#primary > div > div > div > div > div > div.events-schedule-table[class^='events-schedule-table'] > div > table > tbody tr[class^='event-']");
    let events = [];

    table.forEach(item => {
      const dateUnformatted = item.cells[0].innerText;
      const dateSplitted = dateUnformatted.split(' - ');
      const startDate = dateSplitted[0];
      let endDate;

      if (dateSplitted[1] != null) {
        if (dateSplitted[1].split(/\W+/).length === 1) {
          const month = dateSplitted[0].split(' ');
          endDate = month[0] + ' ' + dateSplitted[1];
        } else {
          endDate = dateSplitted[1];
        }
      } else {
        endDate = dateSplitted[1];
      }

      const rangeDate = [startDate, endDate];
      
      const nameUnformatted = item.cells[1].innerText;
      const tourNameUnformatted = item.cells[2].innerText;

      const nameFormatted = nameUnformatted.split('\n');
      const tourNameFormatted = tourNameUnformatted.split('\n');
      
      const name = nameFormatted[0];
      const location = nameFormatted[1];
      const tourName = tourNameFormatted[0];
      const category = tourNameFormatted[1];
      const stop = tourNameFormatted[2];
      const status = item.cells[3].innerText;

      const event = {
        rangeDate,
        name,
        location,
        tourName,
        category,
        stop,
        status
      };

      events.push(event);
    });

    return events;
  });

  return eventsTotal;
};