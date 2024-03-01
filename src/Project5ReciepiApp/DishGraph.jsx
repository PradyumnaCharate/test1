import { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const DishGraph = ({ strMeal }) => { // Receive dishName as a prop
  const chartContainer = useRef(null);

  useEffect(() => {
    let chartInstance = null;

    if (chartContainer && chartContainer.current) {
      if (chartInstance) {
        chartInstance.destroy();
      }

      const ctx = chartContainer.current.getContext('2d');
      chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Calories', 'Fat', 'Protein', 'Carbs'],
          datasets: [{
            label: ` Nutrition for ${strMeal}`, // Use dishName in the label
            data: [240, 15, 10, 35],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [strMeal]);

  return (
    <div style={{ height: '400px' }}>
      <h2>Nutrition Graph for {strMeal}</h2>
      <canvas ref={chartContainer} width={300} height={200}></canvas>
    </div>
  );
};

export default DishGraph;
