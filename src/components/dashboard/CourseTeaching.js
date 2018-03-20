import React from 'react'


const CourseTeaching = ({click, courses}) => {

  return (
      <div>
        {Object.keys(courses).map(key =>

          <p key={key} onClick={()=> click(key)}>
            key = {key}
            title={courses[key].metadata.title}
          </p>
        )}
      </div>
  );
}

export default CourseTeaching
