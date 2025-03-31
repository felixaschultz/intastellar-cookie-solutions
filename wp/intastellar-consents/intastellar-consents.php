<?php
/*
Plugin Name: Intastellar Consents Solutions
Plugin URI: https://www.intastellarsolutions.com/solutions/cookie-consents
Version: 3.4.0
Description: Get your Website GDPR Compliance: Remove 3rd partie cookies from begin on until user gives consents. We are helping you and your Website to become GDPR compliant.
Author: Intastellar Solutions, International
Text Domain: intastellar-consents
Author URI: https://www.intastellarsolutions.com
License:           GPL v2 or later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html
*/

if (! defined('ABSPATH')) exit;

if (!function_exists('add_action')) {
    echo 'Hi there!  I\'m just a plugin, not much I can do when called directly.';
    exit;
}

add_action('plugins_loaded', function () {
    $plugin_data = get_plugin_data(__FILE__);
    $plugin_version = $plugin_data['Version'];
    if (isset($_SERVER["REQUEST_URI"]) && !str_contains(sanitize_url(wp_unslash($_SERVER["REQUEST_URI"])), 'wp-admin')) {
        $betaActive = get_option('intastellarBeta');
        /* wp_enqueue_script("intastellar-gdpr-settings", "https://consents.cdn.intastellarsolutions.com/uc.js?utm_source=Intastellar+GDPR+Wordpress+Plugin", false, $plugin_version, false); */
        switch ($betaActive) {
            case 'true':
                wp_enqueue_script("intastellar-gdpr-settings", "https://beta.intastellar-consents.com/uc.js?utm_source=Intastellar+GDPR+Wordpress+Plugin&beta=true", false, $plugin_version, false);
                break;
            case 'false':
                wp_enqueue_script("intastellar-gdpr-settings", "https://consents.cdn.intastellarsolutions.com/uc.js?utm_source=Intastellar+GDPR+Wordpress+Plugin", false, $plugin_version, false);
                break;
            default:
                wp_enqueue_script("intastellar-gdpr-settings", "https://consents.cdn.intastellarsolutions.com/uc.js?utm_source=Intastellar+GDPR+Wordpress+Plugin", false, $plugin_version, false);
                break;
        }
    }
    include_once plugin_dir_path(__FILE__) . 'includes/int-functions.php';
}, 1);
