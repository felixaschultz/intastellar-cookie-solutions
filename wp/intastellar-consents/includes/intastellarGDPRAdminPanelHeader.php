<?php
if (! defined('ABSPATH')) exit;
$plugin_dir = plugin_dir_url(__FILE__);

echo
'
<div class="intastellar-version"></div>
<header class="intastellarPluginHeader">
    <section class="intastellarPluginHeader-content">
        <img class="intastellarPluginHeader__logo" src="' . esc_url($plugin_dir . 'intastellar-cookie-icon.svg') . '">
        <h2>Intastellar Consents Solutions v <span id="intastellarPluginVersion">' . esc_html($plugin_version) . '</span></h2>
        <a href="https://developers.intastellarsolutions.com/feedback?plugin=GDPR Cookiebanner for Wordpress" target="_blank" rel="noopener noreferrer" class="intastellarFeedback">Send Feedback</a>
    </section>
</header>
';
