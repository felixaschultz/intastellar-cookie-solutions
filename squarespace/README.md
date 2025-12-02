Go to Squarespace → Settings → Code Injection (header)
Paste the snippet (with optional window.INTA config)
Save → refresh page → verify banner loads

```html
<script>
  window.INTA = {
    policy_link: "https://yourdomain.com/privacy-policy",
    settings: {
      rootDomain: "yourdomain.com",
      language: "da",
      theme: "dark"
    }
  };
</script>
<script src="https://cdn.intastellarconsents.com/inta-sqsp-extension-loader.js"></script>
```