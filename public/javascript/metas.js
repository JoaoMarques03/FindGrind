document.addEventListener('DOMContentLoaded', () => {
    const rewards = [
      { id: 'reward1', exercise: 'Shoulder Press', repsThreshold: 50, image: 'img/circulobw.png' },
      { id: 'reward7', exercise: 'Leg Press', repsThreshold: 50, image: 'img/trapeziobw.png' },
      { id: 'reward8', exercise: 'Sit-Up Bench', repsThreshold: 50, image: 'img/triangulobw.png' },
      { id: 'reward4', exercise: 'Chest Press', repsThreshold: 50, image: 'img/octogonobw.png' },
      { id: 'reward5', exercise: 'Push-Up Bars', repsThreshold: 50, image: 'img/quadrifoliobw.png' },
      { id: 'reward3', exercise: 'Free Runner', repsThreshold: 50, image: 'img/quadradobw.png' },
      { id: 'reward6', exercise: 'Horizontal Row', repsThreshold: 50, image: 'img/paralelogramabw.png' },
      { id: 'reward2', exercise: 'Cross Trainer', repsThreshold: 50, image: 'img/pentagonobw.png' }
    ];
  
    function updateRewardImage(reward, reps) {
      const rewardImage = document.getElementById(reward.id);
  
      if (reps >= reward.repsThreshold) {
        rewardImage.src = reward.image.replace('bw', '');
      }
    }
  
    fetch('http://localhost:3000/workouts/reps')
      .then(response => response.json())
      .then(data => {
        data.forEach(item => {
          const { exercise_name, total_reps } = item;
  
          rewards.forEach(reward => {
            if (reward.exercise === exercise_name) {
              updateRewardImage(reward, total_reps);
            }
          });
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });
  