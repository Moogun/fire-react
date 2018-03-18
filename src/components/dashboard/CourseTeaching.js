import React from 'react'


const CourseTeaching = ({courses}) => {
  return (
      <div>
        {Object.keys(courses).map(key =>
          <p key={key}> title={courses[key].title}</p>
        )}
      </div>
  );
}

export default CourseTeaching
