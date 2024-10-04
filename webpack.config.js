import path from "path";

export default{
  entry: "./public/main.js",
  output: {
    filename: "main.bundle.js",
    path: path.resolve('dist')
    
  }
}