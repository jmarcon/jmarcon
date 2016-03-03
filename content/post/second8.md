{
  "date" : "2016-03-03T00:19:25-03:00",
  "draft" : true,
  "title" : "Second",
  "comment" : true
}

<form action="//formspree.io/juliano.marcon@gmail.com"
      method="POST">
      <label for="name"> Nome:
        <input type="text" name="name" />
      </label>
      <label for="email"> Email:
        <input type="email" name="email" />
      </label>
      <input type="submit" value="Send" />
      <input type="hidden" name="_next" value="{{ .Site.BaseURL }}" />
      <input type="hidden" name="_subject" value="Contato GitHub" />
</form>
