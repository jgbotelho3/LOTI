createChart()

async function createChart () {
  const response = await getData()
  const ctx = document.getElementById('chart').getContext('2d')

  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: response.yearsLabel,
      datasets: [
        {
          label: 'Temperatura média da Terra em Celsius (°C)',
          data: response.tempsLabel,
          fill: false,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }
      ]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    callback: function(value, index, values){
                      return value + '°'
                    }
                }
            }]
        }
    }
  })
}

async function getData () {
  const yearsLabel = []
  const tempsLabel = []
  const response = await fetch('ZonAnn.Ts+dSST.csv')
  const data = await response.text()

  const table = data.split('\n').slice(1)

  table.forEach(row => {
    const columns = row.split(',')
    const year = columns[0]
    yearsLabel.push(year)
    const temp = columns[1]
    tempsLabel.push(parseFloat(temp) + 14)
    console.log(year, temp)
  })

  return {yearsLabel, tempsLabel}
}


