// Home.js
import React from 'react';
import '../Style/Home.css';

const Home = () => {
  return (
    <div className="news-container">
      <div className="news-card">
        <h2>Eziline University Wins Best Software House Award</h2>
        <p>
          Eziline University has achieved a remarkable milestone by winning the Best Software House in the IT sector award,
          presented by the President of Pakistan. This prestigious recognition is a testament to the hard work and dedication
          of the entire team at Eziline. It highlights the company’s excellence in the field of IT and serves as a significant
          achievement in its journey towards success.
        </p>
      </div>

      <div className="news-card">
        <h2>Attendance Policy</h2>
        <p>
          At Eziline University, we value the importance of attendance and its impact on academic performance and personal growth.
          Our attendance policy is designed to encourage regular attendance and active engagement in the learning process.
        </p>
        <p>
          All students are expected to attend classes regularly and punctually. Excessive absences may result in academic
          penalties and may affect eligibility for certain activities and programs.
        </p>
        <p>
          Students who miss classes due to legitimate reasons, such as illness or family emergencies, are required to provide
          proper documentation and communicate with their instructors to make up for missed coursework.
        </p>
        <p>
          It is the responsibility of each student to be aware of the attendance policy of each course they are enrolled in and to
          adhere to it throughout the semester.
        </p>
        <p>
          We believe that active participation in classroom activities and discussions is essential for a comprehensive learning
          experience. We encourage all students to make attendance a priority and to take full advantage of the educational
          opportunities provided by the university.
        </p>
      </div>
    </div>
  );
};

export default Home;
