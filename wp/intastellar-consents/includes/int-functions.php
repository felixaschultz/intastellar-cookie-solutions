<?php
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', true);
@ini_set('display_errors', 1);

/*
    Plugin Name: Intastellar Consents Solution
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
require_once(ABSPATH . 'wp-admin/includes/plugin.php');

// get the plugin version
$plugin_data = get_plugin_data(__FILE__);
$plugin_version = $plugin_data['Version'];
$domain = parse_url(home_url(), PHP_URL_HOST);

function intastellarSettingsRegistration()
{
    $domain = parse_url(home_url(), PHP_URL_HOST);
    register_setting('intastellar-consents_plugin_options_group', 'intastellarCustomIcon', 'esc_url');
    register_setting('intastellar-consents_plugin_options_group', 'intastellarCookieBannerColor', 'sanitize_hex_color');
    register_setting('intastellar-consents_plugin_options_group', 'intastellarCookieBanner-brandName', 'sanitize_text_field');
    register_setting('intastellar-consents_plugin_options_group', 'intastellarPrivacyLink', 'esc_url');
    register_setting('intastellar-consents_plugin_options_group', 'intastellarPrivacyLink-checkbox', 'sanitize_text_field');
    register_setting('intastellar-consents_plugin_options_group', 'intastellarSetCookiePosition', 'sanitize_text_field');
    register_setting('intastellar-consents_plugin_options_group', 'intastellarDisplayCookieNoticeText', 'sanitize_text_field');
    register_setting('intastellar-consents_plugin_options_group', 'intastellarSelectLanguage', 'sanitize_text_field');
    register_setting('intastellar-consents_plugin_options_group', 'intastellarCCPA', 'sanitize_text_field');
    register_setting('intastellar-consents_plugin_options_group', 'intastellarCCPAUrl', 'esc_url');
    register_setting('intastellar-consents_plugin_options_group', "intastellarDisplayCookieAdvenced", 'sanitize_text_field');
    register_setting('intastellar-consents_plugin_options_group', 'intastellarCCPAcollection', 'sanitize_text_field');
    register_setting('intastellar-consents_plugin_options_group', 'intastellarCookieList', 'sanitize_text_field');
    register_setting('intastellar-consents_plugin_options_group', 'intastellarSiteRoot', array('default' => $domain), 'sanitize_text_field');
    register_setting('intastellar-consents_plugin_options_group', 'intastellarBannerStyle', 'sanitize_text_field');
    register_setting(
        'intastellar-consents_plugin_options_group',
        'intastellarBeta',
        array(
            'default' => 'false'
        ),
        'sanitize_text_field'
    );
    register_setting('intastellar-consents_plugin_options_group', 'intastellarPluginVersion', array(
        'default' => '3.4.0'
    ), 'sanitize_text_field');
}

function intastellar_output_hidden_options($ignore_hidden_options = array())
{
    // List all option keys registered in the Intastellar options group
    $options_keys = array(
        'intastellarCustomIcon',
        'intastellarCookieBannerColor',
        'intastellarCookieBanner-brandName',
        'intastellarPrivacyLink',
        'intastellarPrivacyLink-checkbox',
        'intastellarSetCookiePosition',
        'intastellarDisplayCookieNoticeText',
        'intastellarSelectLanguage',
        'intastellarCCPA',
        'intastellarCCPAUrl',
        'intastellarDisplayCookieAdvenced',
        'intastellarCCPAcollection',
        'intastellarCookieList',
        'intastellarSiteRoot',
        'intastellarBannerStyle',
        'intastellarBeta',
        'intastellarPluginVersion'
    );

    foreach ($options_keys as $key) {
        if (in_array($key, $ignore_hidden_options)) {
            continue;
        }
        $value = get_option($key);
        echo '<input type="hidden" name="' . esc_attr($key) . '" value="' . esc_html(sanitize_text_field($value)) . '" />';
    }
}

add_action('admin_init', 'intastellarSettingsRegistration', 1);
add_action('admin_enqueue_scripts', 'initIntastellarAdminStyles', 1);

function initIntastellarAdminStyles()
{
    $plugin_version = get_plugin_data(__FILE__)['Version'];
    wp_register_style('intastellarStyle', plugin_dir_url(__FILE__) . 'intastellarAdminStyle.css', false, $plugin_version . '-' . time());
    wp_enqueue_style('intastellarStyle');
    wp_enqueue_script('intastellarScript', plugin_dir_url(__FILE__) . 'intastellarAdminScript.js', true, $plugin_version . '-' . time(), true);
}

function intastellar_enqueue_media_uploader()
{        // Only enqueue on our plugin settings page (for example, using the current screen object)      
    $screen = get_current_screen();
    if (isset($screen->id) && strpos($screen->id, 'intastellar-consents') !== false) {
        $plugin_version = get_plugin_data(__FILE__)['Version'];
        wp_enqueue_media();
        wp_enqueue_script(
            'intastellar-media-uploader',
            plugin_dir_url(__FILE__) . 'media-uploader.js',
            array('jquery'),
            $plugin_version,
            true
        );
    }
}
add_action('admin_enqueue_scripts', 'intastellar_enqueue_media_uploader');

function initIntastellarSettingsPage()
{
    add_menu_page('Intastellar CMP', 'Intastellar CMP', 'manage_options', 'intastellar-consents', 'intastellarGDPRSettingsForm', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWxuczpzZXJpZj0iaHR0cDovL3d3dy5zZXJpZi5jb20vIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMzU2MyAxOTQ5IiB2ZXJzaW9uPSIxLjEiIHhtbDpzcGFjZT0icHJlc2VydmUiIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MjsiPjxnIGlkPSJMYXllcl80Ij48cGF0aCBkPSJNMjY4NC45Miw1MTkuMDQyYy0wLDEyNC4xMjUgLTkzLjEyNSwyMjYuNSAtMjEzLjI5MiwyNDEuMDgzYy01MS45MTcsLTEyNy43MDggLTE0Ni4wNDIsLTIzMy43NSAtMjY1LC0zMDAuNzkyYzI2LjU4MywtMTA1LjI1IDEyMS45MTcsLTE4My4xMjUgMjM1LjQ1OCwtMTgzLjEyNWMxMzQuMTI1LDAgMjQyLjg3NSwxMDguNzA5IDI0Mi44NzUsMjQyLjg3NWwtMC4wNDEsLTAuMDQxWiIgc3R5bGU9ImZpbGw6Izc5ODA4NTtmaWxsLXJ1bGU6bm9uemVybzsiLz48cGF0aCBkPSJNMTc5Mi4xNywxMzUxLjYyYy0xNzUuMzM0LC02MC42NjcgLTM1MC4xNjcsLTEyNi40MTcgLTUxNi41LC0xOTMuODMzYzU5LjI5MSwyNzMuMjUgMzAyLjQxNiw0NzcuOTU4IDU5My40MTYsNDc3Ljk1OGMxNDguNzkyLDAgMjg1LjA0MiwtNTMuNTQyIDM5MC42MjUsLTE0Mi4zMzNjLTEzOC42NjYsLTM1LjEyNSAtMjkyLjIwOCwtODEuMTI1IC00NjcuNTQxLC0xNDEuNzkyWiIgc3R5bGU9ImZpbGw6dXJsKCNfTGluZWFyMSk7ZmlsbC1ydWxlOm5vbnplcm87Ii8+PHBhdGggZD0iTTEzMjQuODgsNzc2LjEyNWMyMjguNzUsMTExLjI1IDc4OC4yNSwzMDEuMzc1IDExMzkuNTQsMzcyLjU4M2M3Ljc5MSwtMzguODc1IDExLjkxNiwtNzkuMDgzIDExLjkxNiwtMTIwLjI1YzAsLTMzNS4zNzUgLTI3MS44NzUsLTYwNy4yOTEgLTYwNy4yOTEsLTYwNy4yOTFjLTI0NC4wODQsLTAgLTQ1NC40NTksMTQ0IC01NTAuOTU5LDM1MS42NjZjMi4yNSwxLjA4NCA0LjUsMi4yMDkgNi43OTIsMy4zMzRsMCwtMC4wNDJaIiBzdHlsZT0iZmlsbDp1cmwoI19MaW5lYXIyKTtmaWxsLXJ1bGU6bm9uemVybzsiLz48cGF0aCBkPSJNMjgxMi4wNCwxNDA2LjI1Yy05Ny4xMjUsLTExLjU0MiAtNTUyLjA0MiwtMTA3LjYyNSAtOTk2LjA4NCwtMjU2LjVjLTMwNCwtMTAxLjkxNyAtNjIyLjA4MywtMjQ0LjE2NyAtODI4Ljc1LC0zMzguOTU4Yy0zNzEuNDE2LC0xNzAuMzc1IC00ODYuNTQxLC0zMjIuNzA5IC0xODkuMjkxLC0yNzEuMjA5YzIwOS45MTYsMzYuMzc1IDM3My43MDgsODIuMjkyIDM3My43MDgsODIuMjkyYy0wLDAgLTM4MS45NTgsLTgyLjc5MiAtMzcuNTgzLDExNy45NThjMjU3LjgzMywxNTAuMjkyIDEyNDkuODMsNDQ3LjEyNSAxNTU3LjA0LDQ4NS43NWMxODkuMTY3LDIzLjc1IC01My4zMzMsLTExNS42MjUgLTUzLjMzMywtMTE1LjYyNWMwLDAgOTU5LjEyNSwzODkuNDE3IDE3NC4zNzUsMjk2LjI1bC0wLjA4MywwLjA0MloiIHN0eWxlPSJmaWxsOnVybCgjX0xpbmVhcjMpO2ZpbGwtcnVsZTpub256ZXJvOyIvPjxwYXRoIGQ9Ik0xMTUuMzMzLDQyNC41YzE4OS4xNjcsLTI4LjQxNyA5MDIuNjY3LDEzMy43MDggOTAyLjY2NywxMzMuNzA4YzAsMCAtODQ0LjE2NywtMTY2LjQxNiAtMzAzLjc1LDE0OC45MTdjMjE1LjgzMywxMjUuOTU4IDY2NS44MzMsMzMyLjQ1OCAxMTIxLjcxLDQ3NS4yNWM2MjEuNzkyLDE5NC43NSAxMDk0LjM4LDI5OC43OTIgMTI4NC43NSwyODcuNzA4YzI5Mi43NSwtMTcgLTM1NS4wNDEsLTMxNC41IC0zNTUuMDQxLC0zMTQuNWMtMCwwIDE0OTQuMTcsNTQ5LjA0MiAzODkuNjI1LDQ3Mi45MTdjLTMzNy4zNzUsLTIzLjI1IC03OTMuNSwtMTA5LjM3NSAtMTM1Ni41OCwtMzA5LjQxN2MtMTAyMiwtMzYzLjA0MSAtMjE3MC4xMiwtODIxLjUgLTE2ODMuMzgsLTg5NC41ODNaIiBzdHlsZT0iZmlsbDp1cmwoI19MaW5lYXI0KTtmaWxsLXJ1bGU6bm9uemVybzsiLz48L2c+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJfTGluZWFyMSIgeDE9IjAiIHkxPSIwIiB4Mj0iMSIgeTI9IjAiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDE5NjIuMjksMjkxLjUsLTI5MS41LDE5NjIuMjksMTI0MSwxMzUwLjkyKSI+PHN0b3Agb2Zmc2V0PSIwIiBzdHlsZT0ic3RvcC1jb2xvcjojYmY5ZDRmO3N0b3Atb3BhY2l0eToxIi8+PHN0b3Agb2Zmc2V0PSIwLjY1IiBzdHlsZT0ic3RvcC1jb2xvcjojOGM3MjMwO3N0b3Atb3BhY2l0eToxIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdHlsZT0ic3RvcC1jb2xvcjojNzY2MDIzO3N0b3Atb3BhY2l0eToxIi8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9Il9MaW5lYXIyIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoNjM0NjYzLDU5MjI5LjIsLTU5MjI5LjIsNjM0NjYzLDM3MDU4MCwxMTUxNDApIj48c3RvcCBvZmZzZXQ9IjAiIHN0eWxlPSJzdG9wLWNvbG9yOiNiZjlkNGY7c3RvcC1vcGFjaXR5OjEiLz48c3RvcCBvZmZzZXQ9IjAuNjUiIHN0eWxlPSJzdG9wLWNvbG9yOiM4YzcyMzA7c3RvcC1vcGFjaXR5OjEiLz48c3RvcCBvZmZzZXQ9IjEiIHN0eWxlPSJzdG9wLWNvbG9yOiM3NjYwMjM7c3RvcC1vcGFjaXR5OjEiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iX0xpbmVhcjMiIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIwIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCgyOTQxLjEyLDExMjQuNjgsLTExMjQuNjgsMjk0MS4xMiwzOTEuMDc3LDQzMC45NjUpIj48c3RvcCBvZmZzZXQ9IjAiIHN0eWxlPSJzdG9wLWNvbG9yOiNiYjk5NGM7c3RvcC1vcGFjaXR5OjEiLz48c3RvcCBvZmZzZXQ9IjAuMzIiIHN0eWxlPSJzdG9wLWNvbG9yOiNiODk2NGE7c3RvcC1vcGFjaXR5OjEiLz48c3RvcCBvZmZzZXQ9IjAuNTIiIHN0eWxlPSJzdG9wLWNvbG9yOiNhZjhmNDQ7c3RvcC1vcGFjaXR5OjEiLz48c3RvcCBvZmZzZXQ9IjAuNjkiIHN0eWxlPSJzdG9wLWNvbG9yOiNhMDgzM2I7c3RvcC1vcGFjaXR5OjEiLz48c3RvcCBvZmZzZXQ9IjAuODQiIHN0eWxlPSJzdG9wLWNvbG9yOiM4YzcyMmQ7c3RvcC1vcGFjaXR5OjEiLz48c3RvcCBvZmZzZXQ9IjAuOTEiIHN0eWxlPSJzdG9wLWNvbG9yOiM4MDY4MjY7c3RvcC1vcGFjaXR5OjEiLz48c3RvcCBvZmZzZXQ9IjEiIHN0eWxlPSJzdG9wLWNvbG9yOiM3YTY0MjQ7c3RvcC1vcGFjaXR5OjEiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iX0xpbmVhcjQiIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIwIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCgyODIzLjI1LDExNTAuODksLTExNTAuODksMjgyMy4yNSwzOTIuOTc5LDQ4MS4xNDQpIj48c3RvcCBvZmZzZXQ9IjAiIHN0eWxlPSJzdG9wLWNvbG9yOiNiNzk3NGE7c3RvcC1vcGFjaXR5OjEiLz48c3RvcCBvZmZzZXQ9IjAuMTMiIHN0eWxlPSJzdG9wLWNvbG9yOiNiMTkxNDQ7c3RvcC1vcGFjaXR5OjEiLz48c3RvcCBvZmZzZXQ9IjAuNjQiIHN0eWxlPSJzdG9wLWNvbG9yOiNhMDdlMzI7c3RvcC1vcGFjaXR5OjEiLz48c3RvcCBvZmZzZXQ9IjEiIHN0eWxlPSJzdG9wLWNvbG9yOiM5YTc4MmM7c3RvcC1vcGFjaXR5OjEiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48L3N2Zz4=');
    add_submenu_page("intastellar-consents", "Intro", "Intro", "manage_options", "intastellar-consents", "intastellarGDPRSettingsForm", null);
    add_submenu_page("intastellar-consents", "Branding", "Branding", "manage_options", "intastellar-consents/branding", "intastellarCookieBranding", null);
    add_submenu_page("intastellar-consents", "Settings", "Settings", "manage_options", "intastellar-consents/settings", "intastellarCookieSettings", null);
    add_submenu_page("intastellar-consents", "Privacy", "Privacy", "manage_options", "intastellar-consents/privacy", "intastellarGDPRPrivacyPage", null);
    add_submenu_page("intastellar-consents", "Beta", "Beta", "manage_options", "intastellar-consents/beta", "intastellarBeta", null);
    add_submenu_page("intastellar-consents", "Help", "Help", "manage_options", "intastellar-consents/help", "intastellarCookieHelp", null);
}
add_action('admin_menu', 'initIntastellarSettingsPage');

if (isset($_SERVER["REQUEST_URI"]) && strpos(sanitize_url(wp_unslash($_SERVER["REQUEST_URI"])), "wp-login.php") === false) {
    // Load the cookie banner
    if (! is_admin() && ! wp_doing_ajax()) {
        add_action('init', 'loadIntastellarCookieBanner');
    }
}

function loadIntastellarCookieBanner()
{
    if (get_option('intastellarCustomIcon')) {
        $logo = get_option('intastellarCustomIcon');
    } else {
        $logo = "";
    }

    if (get_option("intastellarDisplayCookieAdvenced")) {
        $advanced = filter_var(get_option('intastellarDisplayCookieAdvenced'), FILTER_VALIDATE_BOOLEAN);
    } else {
        $advanced = false;
    }

    if (get_option("intastellarCookieBannerColor")) {
        $color = get_option("intastellarCookieBannerColor");
    } else {
        $color = get_theme_mod('background_color');
    }

    if (get_option("intastellarCookieBanner-brandName")) {
        $brandName = get_option("intastellarCookieBanner-brandName");
    } else {
        $brandName = get_bloginfo("name");
    }

    if (get_option('intastellarPrivacyLink-checkbox')) {
        $link = array(
            "url" => get_option('intastellarPrivacyLink'),
            "target" => "_blank"
        );
    } else {
        $link = get_option('intastellarPrivacyLink');
    }
    $collection = explode("\n", get_option('intastellarCCPAcollection'));
    $collection = array_map('trim', $collection);

    $rootDomain = get_option('intastellarSiteRoot');

    $requiredCookies = (str_contains(get_option('intastellarCookieList'), "\n")) ? explode("\n", get_option('intastellarCookieList')) : explode(",", get_option('intastellarCookieList'));

    wp_add_inline_script(
        'intastellar-gdpr-settings',
        'window.INTA = ' . wp_json_encode(array(
            'policy_link' => $link,
            'settings' => array(
                'language' => get_option("intastellarSelectLanguage"),
                'arrange' => get_option("intastellarSetCookiePosition"),
                'logo' => $logo,
                'color' => $color,
                'company' => $brandName,
                'design' => get_option('intastellarBannerStyle'),
                'text' => filter_var(get_option('intastellarDisplayCookieNoticeText'), FILTER_VALIDATE_BOOLEAN),
                'ccpa' => array(
                    "on" => filter_var(get_option('intastellarCCPA'), FILTER_VALIDATE_BOOLEAN),
                    "url" => get_option('intastellarCCPAurl'),
                    "collection" => $collection
                ),
                'requiredCookies' => $requiredCookies,
                'advanced' => $advanced,
                'rootDomain' => $rootDomain
            ),
        )),
        'before'
    );
}

?>
<?php
function intastellarCookieSettings()
{
    $value = get_option('intastellarDisplayCookieNoticeText');
    $value1 = get_option('intastellarSetCookiePosition');
    $language = get_option('intastellarSelectLanguage');

    $plugin_version = get_plugin_data(__FILE__)['Version'];
    include("intastellarGDPRAdminPanelHeader.php");
?>
    <section class="intastellarPluginContent">
        <section class="intastellarPluginGrid">
            <div class="intastellarPluginContent">
                <header class="intastellarPluginPage-header">
                    <h3 class="intastellarPluginHeader__headline">Settings</h3>
                    <p>Adjust here your settings for the cookiebanner, choose where the banner should be position, if you want to have Cookie notice text, view it in fullscreen and change your prefered language.</p>
                </header>
                <form method="post" action="options.php" enctype="multipart/form-data">
                    <?php settings_fields('intastellar-consents_plugin_options_group'); ?>
                    <section class="intastellarPluginContent">
                        <h2>
                            Choose your banner style:
                        </h2>
                        <section class="grid">
                            <label class="intastellarPlugin-style-seletor" for="overlay">
                                <input type="radio" value="overlay" <?php if (get_option("intastellarBannerStyle") == "overlay") {
                                                                        echo esc_html(sanitize_text_field("checked"));
                                                                    } ?> name="intastellarBannerStyle" id="overlay">
                                <img class="intastellar-banner-style-preview" src="<?php echo esc_url(plugin_dir_url(__FILE__) . "/assets/banner-design-2.png") ?>">
                            </label>
                            <label class="intastellarPlugin-style-seletor" for="banner">
                                <input type="radio" value="banner" <?php if (get_option("intastellarBannerStyle") == "banner") {
                                                                        echo esc_html(sanitize_text_field("checked"));
                                                                    } ?> name="intastellarBannerStyle" id="banner">
                                <img class="intastellar-banner-style-preview --banner" src="<?php echo esc_url(plugin_dir_url(__FILE__) . "/assets/banner-design-1.png") ?>">
                            </label>
                        </section>
                    </section>
                    <section id="placement" class="intastellarPluginContent__items">
                        <label for="intastellarSetCookiePosition_id">Placement:</label>
                        <select name="intastellarSetCookiePosition" class="regular-text" id="intastellarSetCookiePosition_id">
                            <option value="ltr" <?php echo esc_html(($value1 == 'ltr' ? 'selected="selected"' : '')); ?>>Left</option>
                            <option value="rtl" <?php echo esc_html(($value1 == 'rtl' ? 'selected="selected"' : '')); ?>>Right</option>
                        </select>
                    </section>
                    <section class="intastellarPluginContent__items">
                        <label for="rootDomain">Your Main Domain</label>
                        <input type="text" name="intastellarSiteRoot" class="regular-text" id="rootDomain" value="<?php echo esc_html(get_option("intastellarSiteRoot")); ?>">
                    </section>
                    <section id="language" class="intastellarPluginContent__items">
                        <label for="intastellarSelectLanguage_id">Language:</label>
                        <select id="intastellarSelectLanguage_id" class="regular-text" name="intastellarSelectLanguage">
                            <option value="auto" <?php echo esc_attr(sanitize_text_field(($language == 'auto' ? 'selected="selected"' : ''))); ?> selected>Auto detect</option>
                            <option value="danish" <?php echo esc_attr(sanitize_text_field(($language == 'danish' ? 'selected="selected"' : ''))); ?>>Danish</option>
                            <option value="dutch" <?php echo esc_attr(sanitize_text_field(($language == 'dutch' ? 'selected="selected"' : ''))); ?>>Dutch</option>
                            <option value="english" <?php echo esc_attr(sanitize_text_field(($language == 'english' ? 'selected="selected"' : ''))); ?>>English</option>
                            <option value="french" <?php echo esc_attr(sanitize_text_field(($language == 'french' ? 'selected="selected"' : ''))); ?>>French</option>
                            <option value="finnish" <?php echo esc_attr(sanitize_text_field(($language == 'finnish' ? 'selected="selected"' : ''))); ?>>Finnish</option>
                            <option value="german" <?php echo esc_attr(sanitize_text_field(($language == 'german' ? 'selected="selected"' : ''))); ?>>German</option>
                            <option value="italian" <?php echo esc_attr(sanitize_text_field(($language == 'italian' ? 'selected="selected"' : ''))); ?>>Italian</option>
                            <option value="norwegian" <?php echo esc_attr(sanitize_text_field(($language == 'norwegian' ? 'selected="selected"' : ''))); ?>>Norwegian</option>
                            <option value="russian" <?php echo esc_attr(sanitize_text_field(($language == 'russian' ? 'selected="selected"' : ''))); ?>>Russian</option>
                            <option value="spanish" <?php echo esc_attr(sanitize_text_field(($language == 'spanish' ? 'selected="selected"' : ''))); ?>>Spanish</option>
                            <option value="swedish" <?php echo esc_attr(sanitize_text_field(($language == 'swedish' ? 'selected="selected"' : ''))); ?>>Swedish</option>
                        </select>
                    </section>
                    <section>
                        <label>
                            <h3>Required Cookies list:</h3>
                            <p>Write here a list of cookies that the website is required to use.</p>
                            <p>Example 1: <code>cookie1, cookie2, cookie3</code></p>
                            <p>Example 2: <code>
                                    cookie1
                                    cookie2
                                    cookie3
                                </code></p>
                            <textarea name="" id="cookieList" cols="30" rows="10" value="<?php echo esc_html(sanitize_text_field(get_option('intastellarCookieList'))); ?>"></textarea>
                        </label>
                    </section>
                    <section id="text" class="intastellarPluginContent__items">
                        Display Cookie Notice text:
                        <section>
                            <input type="radio" class="regular-text --radio" name="intastellarDisplayCookieNoticeText" value="true" <?php echo esc_html(sanitize_text_field(($value == 'true' ? 'checked="checked"' : ''))); ?> /> Yes
                            <input type="radio" class="regular-text --radio" name="intastellarDisplayCookieNoticeText" value="false" <?php echo esc_html(sanitize_text_field(($value == 'false' || $value == '' ? 'checked="checked"' : ''))); ?> /> No
                        </section>
                    </section>
                    <?php intastellar_output_hidden_options(array(
                        "intastellarDisplayCookieNoticeText",
                        "intastellarSetCookiePosition",
                        "intastellarSelectLanguage",
                        "intastellarCookieList",
                        "intastellarSiteRoot",
                        "intastellarBannerStyle"
                    )); ?>
                    <button type="submit" class="intastellarPluginSaveButton">Save changes</button>
                </form>
                <p>You can also read the docs and download the newest version: <a href="https://developers.intastellarsolutions.com/cookie-solutions/docs/wordpress-docs?utm_medium=wordpress_plugin&utm_source=<?php if (isset($_SERVER["HTTP_HOST"])) {
                                                                                                                                                                                                                    echo esc_url(sanitize_url(wp_unslash($_SERVER["HTTP_HOST"])));
                                                                                                                                                                                                                } ?>" target="_blank" rel="noopener">Intastellar GDPR cookie banner</a></p>

            </div>
        </section>
    </section>
<?php
    include("intastellarGDPRAdminPanelFooter.php");
} ?>
<?php
function intastellarGDPRSettingsForm()
{
    $checkbox = get_option('intastellarPrivacyLink-checkbox');
    $language = get_option('intastellarSelectLanguage');
    $plugin_version = get_plugin_data(__FILE__)['Version'];
    include("intastellarGDPRAdminPanelHeader.php");
?>
    <section class="intastellarPluginContent">
        <?php
        $plugin_version = get_plugin_data(__FILE__)['Version'];
        if ($plugin_version != get_option('intastellarPluginVersion')) {
            update_option('intastellarPluginVersion', $plugin_version);
            esc_html('<div class="intastellarPluginContent__items --update">New Version: ' . $plugin_version . '</div>');
        }
        ?>
        <section class="intastellarPluginGrid">
            <div class="intastellarPluginContent">
                <header class="intastellarPluginPage-header">
                    <h3 class="intastellarPluginHeader__headline">Welcome to Intastellar Consents Solutions</h3>
                    <p>This cookie banner helps you and your Website to become GDPR conform.</p>
                </header>
                <form method="post" action="options.php" enctype="multipart/form-data">
                    <p>To get started we need your Privacy Policy to begin with. After that you can edit the branding: choose your brand color and your own logo, and under the settings page you can go into detail, the placement of the cookie banner, choose whether nor to display text in the cookie notice, or what language you wanna use.</p>
                    <p>You wanna learn more about this cookie banner? Then you can read more under: <a target="_blank" href="https://www.intastellarsolutions.com/solutions/cookie-consents">www.intastellarsolutions.com/solutions/cookie-consents</a></p>
                    <p>So lets get started with your privacy policy & prefered language.</p>
                    <?php settings_fields('intastellar-consents_plugin_options_group'); ?>
                    <section id="privacy" class="intastellarPluginContent__items">
                        <label for="intastellarPrivacyLink_id">URL to <strong>your</strong> Privacy Policy page*:</label>
                        <section>
                            <input type='text' class="regular-text" id="intastellarPrivacyLink_id" name="intastellarPrivacyLink" required value="<?php echo esc_html(sanitize_text_field(get_option('intastellarPrivacyLink'))); ?>">
                            <input type="checkbox" class="intastellarPluginContent__items-checkbox" id="intastellarPrivacyLink-checkbox" name="intastellarPrivacyLink-checkbox" value="true" <?php echo esc_html(sanitize_text_field(($checkbox == 'true' ? 'checked="checked"' : ''))); ?>> <label for="intastellarPrivacyLink-checkbox">Open in new window</label>
                        </section>
                    </section>
                    <section class="intastellarPluginContent__items">
                        <label for="rootDomain">Your Main Domain</label>
                        <input type="text" name="intastellarSiteRoot" class="regular-text" id="rootDomain" value="<?php echo esc_html(sanitize_text_field(get_option("intastellarSiteRoot"))); ?>">
                    </section>
                    <section id="language" class="intastellarPluginContent__items">
                        <label for="intastellarSelectLanguage_id">Language:</label>
                        <select id="intastellarSelectLanguage_id" class="regular-text" name="intastellarSelectLanguage">
                            <option value="auto" <?php echo esc_attr(sanitize_text_field(($language == 'auto' ? 'selected="selected"' : ''))); ?> selected>Auto detect</option>
                            <option value="danish" <?php echo esc_attr(sanitize_text_field(($language == 'danish' ? 'selected="selected"' : ''))); ?>>Danish</option>
                            <option value="dutch" <?php echo esc_attr(sanitize_text_field(($language == 'dutch' ? 'selected="selected"' : ''))); ?>>Dutch</option>
                            <option value="english" <?php echo esc_attr(sanitize_text_field(($language == 'english' ? 'selected="selected"' : ''))); ?>>English</option>
                            <option value="french" <?php echo esc_attr(sanitize_text_field(($language == 'french' ? 'selected="selected"' : ''))); ?>>French</option>
                            <option value="finnish" <?php echo esc_attr(sanitize_text_field(($language == 'finnish' ? 'selected="selected"' : ''))); ?>>Finnish</option>
                            <option value="german" <?php echo esc_attr(sanitize_text_field(($language == 'german' ? 'selected="selected"' : ''))); ?>>German</option>
                            <option value="italian" <?php echo esc_attr(sanitize_text_field(($language == 'italian' ? 'selected="selected"' : ''))); ?>>Italian</option>
                            <option value="norwegian" <?php echo esc_attr(sanitize_text_field(($language == 'norwegian' ? 'selected="selected"' : ''))); ?>>Norwegian</option>
                            <option value="russian" <?php echo esc_attr(sanitize_text_field(($language == 'russian' ? 'selected="selected"' : ''))); ?>>Russian</option>
                            <option value="spanish" <?php echo esc_attr(sanitize_text_field(($language == 'spanish' ? 'selected="selected"' : ''))); ?>>Spanish</option>
                            <option value="swedish" <?php echo esc_attr(sanitize_text_field(($language == 'swedish' ? 'selected="selected"' : ''))); ?>>Swedish</option>
                        </select>
                    </section>
                    <?php intastellar_output_hidden_options(array(
                        "intastellarPrivacyLink",
                        "intastellarPrivacyLink-checkbox",
                        "intastellarSelectLanguage",
                        "intastellarSiteRoot"
                    )); ?>
                    <button type="submit" class="intastellarPluginSaveButton">Save changes</button>
                </form>
                <p>You can also read the docs or download the newest version: <a href="https://developers.intastellarsolutions.com/cookie-solutions/docs/wordpress-docs?utm_medium=wordpress_plugin&utm_source=<?php if (isset($_SERVER["HTTP_HOST"])) {
                                                                                                                                                                                                                    if (isset($_SERVER["HTTP_HOST"])) {
                                                                                                                                                                                                                        echo esc_url(sanitize_url(wp_unslash($_SERVER["HTTP_HOST"])));
                                                                                                                                                                                                                    };
                                                                                                                                                                                                                } ?>" target="_blank" rel="noopener">Intastellar Consents Solutions</a></p>

            </div>
        </section>
    </section>
<?php
    include("intastellarGDPRAdminPanelFooter.php");
} ?>
<?php
function intastellarGDPRPrivacyPage()
{
    $checkbox = get_option('intastellarPrivacyLink-checkbox');
    $plugin_version = get_plugin_data(__FILE__)['Version'];
    include("intastellarGDPRAdminPanelHeader.php");
?>
    <section class="intastellarPluginContent">
        <section class="intastellarPluginGrid">
            <div class="intastellarPluginContent">
                <header class="intastellarPluginPage-header">
                    <h3 class="intastellarPluginHeader__headline">Privacy Policy</h3>
                    <p>Change your privacy link and if you want to have it open in a new window.</p>
                </header>
                <form method="post" action="options.php" enctype="multipart/form-data">
                    <?php settings_fields('intastellar-consents_plugin_options_group'); ?>
                    <section id="privacy" class="intastellarPluginContent__items">
                        <label for="intastellarPrivacyLink_id">URL to <strong>your</strong> Privacy Policy page*:</label>
                        <section>
                            <input type='text' class="regular-text" id="intastellarPrivacyLink_id" name="intastellarPrivacyLink" required value="<?php echo esc_html(sanitize_text_field(get_option('intastellarPrivacyLink'))); ?>">
                            <input type="checkbox" class="intastellarPluginContent__items-checkbox" id="intastellarPrivacyLink-checkbox" name="intastellarPrivacyLink-checkbox" value="true" <?php echo esc_html(sanitize_text_field(sanitize_text_field(($checkbox == 'true' ? 'checked="checked"' : '')))); ?>> <label for="intastellarPrivacyLink-checkbox">Open in new window</label>
                        </section>
                    </section>
                    <?php intastellar_output_hidden_options(array(
                        "intastellarPrivacyLink",
                        "intastellarPrivacyLink-checkbox"
                    )); ?>
                    <button type="submit" class="intastellarPluginSaveButton">Save changes</button>
                </form>
                <p>You can also read the docs or download the newest version: <a href="https://developers.intastellarsolutions.com/cookie-solutions/docs/wordpress-docs?utm_medium=wordpress_plugin&utm_source=<?php if (isset($_SERVER["HTTP_HOST"])) {
                                                                                                                                                                                                                    echo esc_url(sanitize_url(wp_unslash($_SERVER["HTTP_HOST"])));
                                                                                                                                                                                                                } ?>" target="_blank" rel="noopener">Intastellar Consents Solutions</a></p>

            </div>
        </section>
    </section>
<?php
    include("intastellarGDPRAdminPanelFooter.php");
} ?>
<?php
function intastellarCookieBranding()
{
    $plugin_version = get_plugin_data(__FILE__)['Version'];
    include("intastellarGDPRAdminPanelHeader.php");
?>
    <section class="intastellarPluginContent">
        <section class="intastellarPluginGrid">
            <div class="intastellarPluginContent">
                <header class="intastellarPluginPage-header">
                    <h3 class="intastellarPluginHeader__headline">Branding</h3>
                    <p>Customize your banner to reflect your brands identity. Change the apperance of the cookie banner, by using your brand color and logo. </p>
                </header>
                <form method="post" action="options.php" enctype="multipart/form-data">
                    <?php settings_fields('intastellar-consents_plugin_options_group'); ?>
                    <section id="brandname" class="intastellarPluginContent__items">
                        <label for="intastellarCustomIcon_id">
                            Brand name / Company name:
                        </label>
                        <section>
                            <input type="text" class="regular-text" id="intastellarCookieBanner-brandName" name="intastellarCookieBanner-brandName" value="<?php if (get_option('intastellarCookieBanner-brandName')) {
                                                                                                                                                                echo esc_html(sanitize_text_field(get_option('intastellarCookieBanner-brandName')));
                                                                                                                                                            } else {
                                                                                                                                                                echo esc_html(sanitize_text_field(get_bloginfo("name")));
                                                                                                                                                            } ?>">
                        </section>
                    </section>
                    <section id="color" class="intastellarPluginContent__items">
                        <label for="intastellarCookieBannerColor_id">Brand Color:</label>
                        <div class="colorPallet">
                            <input type='color' class="regular-text --color" id="intastellarCookieBannerColor_id" name="intastellarCookieBannerColor" value="<?php if (get_option('intastellarCookieBannerColor')) {
                                                                                                                                                                    echo esc_html(sanitize_text_field(get_option('intastellarCookieBannerColor')));
                                                                                                                                                                } else {
                                                                                                                                                                    echo esc_html(sanitize_text_field(get_theme_mod('background_color')));
                                                                                                                                                                } ?>">
                            <span class="colorValue" id="intastellarCookieBannerColorValue" contenteditable><?php if (get_option('intastellarCookieBannerColor')) {
                                                                                                                echo esc_html(sanitize_text_field(get_option('intastellarCookieBannerColor')));
                                                                                                            } else {
                                                                                                                echo esc_html(sanitize_text_field(get_theme_mod('background_color')));
                                                                                                            } ?></span>
                        </div>
                    </section>
                    <section id="logo" class="intastellarPluginContent__items">
                        <label for="intastellarCustomIcon_id">Cookie Setting Logo:
                            <br>
                            <small>Recommended:<br>A max-width of 200px <br> and a min-width of 100px <br>for near square logos</small>
                        </label>
                        <section>
                            <img src="<?php echo esc_html(sanitize_text_field(get_option('intastellarCustomIcon'))); ?>" class="intastellarCookieSettingsLogo" id="intastellarCustomIconPreview">
                            <input type='hidden' class="regular-text --fullWidth" id="intastellarCustomIcon_id" name="intastellarCustomIcon" value="<?php echo esc_html(sanitize_text_field(get_option('intastellarCustomIcon'))); ?>">
                            <button type="button" class="intastellar-select-logo-button" id="intastellarCustomIconButton">Select or Upload Logo</button>
                        </section>
                    </section>
                    <?php intastellar_output_hidden_options(array(
                        "intastellarCustomIcon",
                        "intastellarCookieBannerColor",
                        "intastellarCookieBanner-brandName",
                    )); ?>
                    <button type="submit" class="intastellarPluginSaveButton">Save changes</button>
                </form>
                <p>You can also read the docs and download the newest version: <a href="https://developers.intastellarsolutions.com/cookie-solutions/docs/wordpress-docs?utm_medium=wordpress_plugin&utm_source=<?php if (isset($_SERVER["HTTP_HOST"])) {
                                                                                                                                                                                                                    echo esc_url(sanitize_url(wp_unslash($_SERVER["HTTP_HOST"])));
                                                                                                                                                                                                                } ?>" target="_blank" rel="noopener">Intastellar Consents Solutions</a></p>
            </div>
        </section>
    </section>
<?php
    include("intastellarGDPRAdminPanelFooter.php");
} ?>

<?php
function intastellarBeta()
{
    $plugin_version = get_plugin_data(__FILE__)['Version'];
    include("intastellarGDPRAdminPanelHeader.php");
?>
    <section class="intastellarPluginContent">
        <section class="intastellarPluginGrid">
            <div class="intastellarPluginContent">
                <header class="intastellarPluginPage-header">
                    <h3 class="intastellarPluginHeader__headline">Beta</h3>
                    <p>Enable the beta version of Intastellar Consents to get the newest features and updates.</p>
                </header>
                <form method="post" action="options.php" enctype="multipart/form-data">
                    <?php settings_fields('intastellar-consents_plugin_options_group'); ?>
                    <label for="intastellarBeta">Activate Intastellar Consents Beta</label>
                    <input type="checkbox" id="intastellarBeta" name="intastellarBeta" value="<?php echo get_option('intastellarBeta') == 'true' ? "false" : "true"; ?>" <?php echo esc_html(sanitize_text_field(get_option('intastellarBeta') == 'true' ? 'checked="checked"' : '')); ?>>
                    <?php intastellar_output_hidden_options(array("intastellarBeta")); ?>
                    <button type="submit" class="intastellarPluginSaveButton">Save changes</button>
                </form>
            </div>
        </section>
    </section>
<?php
    include("intastellarGDPRAdminPanelFooter.php");
} ?>
<?php
function intastellarCookieHelp()
{
    $plugin_version = get_plugin_data(__FILE__)['Version'];
    include("intastellarGDPRAdminPanelHeader.php");
?>
    <section class="intastellarPluginContent">
        <section class="intastellarPluginGrid">
            <div class="intastellarPluginContent">
                <h1>Help</h1>
                <p>A list of documentation & faq´s to help you further:</p>
                <ul>
                    <li><a href="https://developers.intastellarsolutions.com/cookie-solutions/docs/wordpress-docs" target="_blank">Official Documentation</a></li>
                    <li><a href="https://support.intastellarsolutions.com/cookie-solutions/faq" target="_blank">Official FAQ´s</a></li>
                </ul>
            </div>
        </section>
    </section>
<?php
    include("intastellarGDPRAdminPanelFooter.php");
} ?>