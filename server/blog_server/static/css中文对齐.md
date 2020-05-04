# css中文对齐
一个标签内经常如果出现多行文字，文字的对齐问题靠简单的css即可解决
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<style>
    p {
    padding: 10px 20px;
    background-color: #f0f3f9;
    width: 200px;
    }
    .justify {
    text-align: justify;
    text-justify: inter-ideograph;
    }
</style>
<body>
    <strong>居左对齐</strong>
    <p>这是一段临时想出来的文案，其中可能参杂了几个英文单词，例如CSS，例如JS等。</p>
    <strong>两端对齐</strong>
    <p class="justify">这是一段临时想出来的文案，其中可能参杂了几个英文单词，例如CSS，例如JS等。</p>
</body>
</html>
```