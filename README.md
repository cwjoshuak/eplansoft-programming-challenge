# PDF Annotator

A React application that allows you to upload a pdf file and annotate it with red squares.

### [ePlanSoft Programming Challenge](./Programming%20Challenge.pdf)

Given a PDF file ([sample.pdf](./public/sample/sample.pdf)), create a web or mobile application that allows a user to annotate the PDF file with a red polygon resulting in what you see in [final.pdf](./public/sample/final.pdf).

[See Challenge]

## Build Steps

```
$ git clone
$ yarn cd eplansoft-programming-challenge
$ yarn install
$ yarn start
```

## Usage

Upload or use the provided pdf file, and click twice on the HTML Canvas. `CTRL-P` to download / print the annotated page.

## Technologies & Libraries Used

- React.js
- react-pdf

## Challenges Faced

1. The HTML canvas ratio was preset by the React-PDF library and this resulted in uneven placement of initial annotations due to scaling and height/width differences.
2. Faced babel / webpack errors while testing out annotpdf and pdf.js.
3. The application will bug out if you upload a pdf or if the view moves out of the viewport.

## For Future

1. Integrate PDF-LIB to allow for proper downloading of annotated pdf file by modifying a temporary pdf file while user is adding annotations.
