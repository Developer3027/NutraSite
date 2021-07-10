### Notes

#### Google is just spinning, blank popup
After switching from class to functional components, found the google log in would not work. Clicking the button would open the pop up but would not go anywhere. I found that in the form tag, I did the typical onSubmit={} and passed handleSubmit. However I placed it in a function like in the example;

```<form onSubmit={()=> handleSubmit}>```

Once I removed the function and just set the handleSubmit, It worked just fine. Like this example.

```<form onSubmit={handleSubmit}>```