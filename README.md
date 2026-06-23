![Intastellar Consents Banner](/img/github__banner.jpg "Intastellar Consents Banner")

# Intastellar Consents Solutions
![version](https://img.shields.io/github/v/tag/felixaschultz/intastellar-cookie-solutions?label=version)
![license](https://img.shields.io/github/license/felixaschultz/intastellar-cookie-solutions)
![Bundle Size](https://img.shields.io/badge/size-12kb-green)
![PRs welcome](https://img.shields.io/badge/PRs-welcome-blue)


## Table of contents

- [General info](#general-info)
- [Development](#development)
- [Beta testing](#beta-testing)
- [Implementation](#implementation)
- [Trackers & Supported Consents Mode](#trackers--supported-consents-mode)
- [Support](#support)
- [License](#license)
- [Contributing](#contributing)
- [Acknowledgements](#acknowledgements)
- [Intastellar Solutions](https://www.intastellarsolutions.com)
- [Intastellar Consents](https://www.intastellar-consents.com)
- [Intastellar Consents Solutions](https://www.intastellarsolutions.com/solutions/cookie-consents)
- [Intastellar Consents Documentation](https://developers.intastellarsolutions.com/cookie-solutions/docs)

## Who is it for

This project is for developers and businesses who want to implement a cookie banner on their website.
## How to use it

You can implement the cookie banner by loading the following script into your website:

```html
<script>
  window.INTA = {
    policy_link: "[Link to your privacy policy]",
    settings: {
      color: "Your brand color",
      logo: "Link to your logo",
      rootDomain: "example.com",
      arrange: "ltr or rtl",
      design: "banner | bannerV2 | overlay"
    }
  }
</script>
<script src="https://consents.cdn.intastellarsolutions.com/uc.js"></script>
```

## General Info

With this project I wanted to build my own cookie banner witch is free to use. I was not always happy about all the cookie banners solutions I´ve found online, either the banner wasn´t all that good or you needed an account to get access to the banner for implementation.

As an indie webdev and front-end developer I´ve decided to start building my own little banner and it evolved to this project.
This cookie banner is also available in diffrent language:

Available languages:

- German
- Danish
- English
- Spanish
- French
- Swedish
- Norwegian
- Finnish
- Italian
- Russian
- Dutch
- Portuguese

You can read more about the cookie banner under: https://www.intastellarsolutions.com/solutions/cookie-consents.
This banner is free to use as long as the powered by logo is not removed. We are glad if you want to contribuate to this project so we can develop it further and we can make it secure.

We support your own cookiebanner design. Just use our technology to block thrid party cookies.

## Development

If you want to develop on the banner you must do that in your own branch and in all \*.dev.js files. You create your branch from the "development" branch, and merge your also into
that. The "cb(.dev).js" file is the function to create the banner via HTML and CSS and styling. The "gdpr(.dev).js" file is all the functionality of the banner.

To generate locale files you can use the following command:
```bash
npm run generate-locale-files
```
This will generate the locale files in the "languages" folder.

After editing `dev/gdpr.dev.js`, regenerate the boot/core split before testing or deploying:
```bash
node scripts/build-uc-split.mjs
```
Local test site loads `dev/uc-boot.dev.js` (which async-loads `dev/uc-core.dev.js`).
```bash
node scripts/build-not-required-patterns.mjs
```
This will generate the not required patterns in the "dev" folder.
```bash
node scripts/build-uc-split.mjs

## Beta testing

If you want to beta test the banner you can do that by loading the beta version of the banner. Just load the beta version of the banner via https://beta.intastellar-consents.com/uc.js.

```html
<script src="https://beta.intastellar-consents.com/uc.js"></script>
```

Remember that the beta version is not stable and can have bugs. If you find a bug please report it to us.

## Implementation

Read our documentation under: https://developers.intastellarsolutions.com/cookie-solutions/docs to implement our cookie banner on your website.
You can add and load it direct via loading https://consents.cdn.intastellarsolutions.com/uc.js into your website.

```html
<link rel="preconnect" href="https://consents.cdn.intastellarsolutions.com" crossorigin>
<link rel="preload" href="https://consents.cdn.intastellarsolutions.com/uc.js" as="script" crossorigin>
<link rel="preload" href="https://consents.cdn.intastellarsolutions.com/uc-core.js" as="script" crossorigin>
<script>
  window.INTA = {
    policy_link: "[Link to your privacy policy]",
    settings: {
      color: "Your brand color",
      logo: "Link to your logo",
      rootDomain: "example.com",
      arrange: "ltr or rtl",
      design: "banner | bannerV2 | overlay"
    }
  }
</script>
<script src="https://consents.cdn.intastellarsolutions.com/uc.js"></script>
```
## Trackers & Supported Consents Mode

We support the following trackers and consents mode:
| Tracker | Description | Consent Mode |
| ------- | ----------- | ------------ |
| Google Analytics | Google Analytics is a web analytics service offered by Google that tracks and reports website traffic. | [Google Consent Mode](https://developers.google.com/tag-platform/devguides/consent) |
| Google Ads | Google Ads is an online advertising platform developed by Google, where advertisers pay to display brief advertisements, service offerings, product listings, or videos to web users. | [Google Consent Mode](https://developers.google.com/tag-platform/devguides/consent) |
| Facebook Pixel | The Facebook pixel is a piece of code that you place on your website to track conversions from Facebook ads, optimize ads based on collected data, and retarget website visitors. | [Facebook Consent Mode](https://developers.facebook.com/docs/facebook-pixel/) |
| Google Tag Manager | Google Tag Manager is a tag management system that allows you to quickly and easily update tags and code snippets on your website or mobile app. | [Google Consent Mode](https://developers.google.com/tag-platform/devguides/consent) |
| HubSpot | HubSpot is a marketing, sales, and service software that helps businesses grow by providing tools for email marketing, social media marketing, content management, web analytics, and landing pages. | [HubSpot Cookie Banner API](https://developers.hubspot.com/docs/reference/api/analytics-and-events/cookie-banner/cookie-banner-api) |
| Shopify | Shopify is an e-commerce platform that allows you to create an online store and sell products. | [Shopify Customer Privacy API](https://shopify.dev/docs/api/customer-privacy) |
| VWO | VWO is a conversion rate optimization platform that allows you to test and optimize your website. | [VWO Cookie Consent API](https://vwo.com/docs/api/cookie-consent/) |
| Pintrk | Pintrk is a platform that allows you to track your website visitors and retarget them with ads. | [Pintrk Consent Mode](https://www.pintrk.com/docs/consent-mode/) |
| Microsoft Clarity | Microsoft Clarity is a web analytics service that helps you understand your website visitors and improve your website. | [Microsoft Clarity Consent Mode](https://clarity.microsoft.com/docs/consent-mode/) |

## Support

- [Intastellar Solutions](https://www.intastellarsolutions.com)
- [Intastellar Consents](https://www.intastellar-consents.com)
- [Intastellar Consents Documentation](https://developers.intastellarsolutions.com/cookie-solutions/docs)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

If you want to contribute to this project, please fork the repository and create a pull request. We are glad if you want to contribute to this project so we can develop it further and we can make it secure.

## Acknowledgements

- [Intastellar Solutions](https://www.intastellarsolutions.com)
- [Intastellar Consents Solutions](https://www.intastellarsolutions.com/solutions/cookie-consents)
- [Intastellar Consents Platform](https://www.intastellarconsents.com)

