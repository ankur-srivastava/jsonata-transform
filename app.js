const express = require('express');
const jsonata = require('jsonata');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs');

const inputStr = {
    courseTitle: 'Analytics 101',
    courseDescription: 'Analytics 101 for Beginners',
    courseModality: 'Course',
};

const baseTransform = '{"title": courseTitle, "author": ($author ? $author : "Ankur")}';
const addOn = '{"description": "Custom Description", "modality": (courseModality ? courseModality : "Specialization"), "author": "Nick"}';

// Ankur - For Display Purpose
const baseTransformDisplay = {
    title: 'courseTitle', 
    author: '$author ? $author : "Ankur"'
};

const addOnDisplay = {
    description: 'Sample Description', 
    modality: 'courseModality ? courseModality : "Watch"', 
    author: 'Nick'
};

// const transformData = () => {
//     const jsonAtaTemp = '{"title": courseTitle,"description": ($courseDescription ? $courseDescription : "Coursera Sample Course"),"modality": ($courseModality ? $courseModality : "Watch")}';
//     const configurables = { courseDescription: 'Basic Analytics' };
    
//     try {
//       const expression = jsonata(jsonAtaTemp);
//       const response = expression.evaluate(inputStr, configurables);
//       console.log(`${JSON.stringify(response, null, 2)}`);
//       return response;
//     } catch (error) {
//         console.log(`Error on transformUsingJsonAta. Error: ${error}`);
//         throw new Error(error);
//     }
// };

const mergeTransforms = () => {
    // const addOn = '{"description": $courseDescription, "modality": "watch"}';
    // const jsonAtaTemp = '$merge([{"title": courseTitle}, {"description": $courseDescription, "modality": "watch"}])';
    const jsonAtaTemp = `$merge([${baseTransform}, ${addOn}])`;
    // const configurables = { courseDescription: 'Basic Analytics' };
    
    try {
      const expression = jsonata(jsonAtaTemp);
      // const response = expression.evaluate(inputStr, configurables);
      const response = expression.evaluate(inputStr);
      console.log(`${JSON.stringify(response, null, 2)}`);
      return response;
    } catch (error) {
        console.log(`Error on transformUsingJsonAta. Error: ${error}`);
        throw new Error(error);
    }
};

app.get("/", function(req, res) {
    // const data = transformData();
    const data = mergeTransforms();
    res.render("index", {
        baseTransformDisplay,
        addOnDisplay,
        data,
        inputStr
    });
});

app.listen(3000, function() {
    console.log('Server Up');
});