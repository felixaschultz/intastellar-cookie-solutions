![Intastellar Consents Banner](/img/github__banner.jpg "Intastellar Consents Banner")

# Intastellar Consents Solutions

## Table of contents

- [General info](#general-info)
- [Development](#development)
- [Beta testing](#beta-testing)
- [Implementation](#implementation)
- [Trackers & Supported Consents Mode](#trackers--supported-consents-mode)
- [Support](#support)
- [License](#license)

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

You can read more about the cookie banner under: https://www.intastellarsolutions.com/solutions/cookie-consents.
This banner is free to use as long as the powered by logo is not removed. We are glad if you want to contribuate to this project so we can develop it further and we can make it secure.

We support your own cookiebanner design. Just use our technology to block thrid party cookies.

## Development

If you want to develop on the banner you must do that in your own branch and in all \*.dev.js files. You create your branch from the "development" branch, and merge your also into
that. The "cb(.dev).js" file is the function to create the banner via HTML and CSS and styling. The "gdpr(.dev).js" file is all the functionality of the banner

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
| LinkedIn Insight Tag | The LinkedIn Insight Tag is a piece of JavaScript code that you can add to your website to enable conversion tracking, retargeting, and web analytics for LinkedIn ads. | [LinkedIn Consent Mode](https://www.linkedin.com/help/linkedin/answer/67587/linkedin-insight-tag?lang=en) |

## Support

- [Intastellar Solutions](https://www.intastellarsolutions.com)
- [Intastellar Consents](https://www.intastellar-consents.com)
- [Intastellar Consents Solutions](https://www.intastellar-consents.com/solutions)
- [Intastellar Consents Documentation](https://developers.intastellarsolutions.com/cookie-solutions/docs)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

If you want to contribute to this project, please fork the repository and create a pull request. We are glad if you want to contribute to this project so we can develop it further and we can make it secure.

## Acknowledgements

- [Intastellar Solutions](https://www.intastellarsolutions.com)
- [Intastellar Consents Solutions](https://www.intastellarsolutions.com/solutions/cookie-consents)
