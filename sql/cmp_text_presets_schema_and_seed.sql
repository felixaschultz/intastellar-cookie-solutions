-- CMP text-override presets (MariaDB / MySQL 5.7+)
-- `_preset` = stable identity (slug). `_presets_version` = versioned JSON payload.

SET NAMES utf8mb4;

CREATE TABLE IF NOT EXISTS `_preset` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `organization_id` BIGINT UNSIGNED NULL DEFAULT NULL,
  `slug` VARCHAR(191) NOT NULL,
  `name` VARCHAR(255) NOT NULL DEFAULT '',
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_preset_org_slug` (`organization_id`, `slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `_presets_version` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `preset_id` BIGINT UNSIGNED NOT NULL,
  `version` INT UNSIGNED NOT NULL DEFAULT 1,
  `status` ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'draft',
  `payload` JSON NOT NULL,
  `published_at` DATETIME(3) NULL DEFAULT NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_preset_version` (`preset_id`, `version`),
  KEY `idx_preset_status` (`preset_id`, `status`),
  CONSTRAINT `fk_presets_version_preset`
    FOREIGN KEY (`preset_id`) REFERENCES `_preset` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- Seed: five presets (one published version each). Slugs = textOverridePresetId.
-- Set @org to your organisation id, or NULL for global slugs.
-- ---------------------------------------------------------------------------

SET @org := NULL;

INSERT IGNORE INTO `_preset` (`organization_id`, `slug`, `name`, `created_at`, `updated_at`)
VALUES
(@org, 'copy-ultra-short', 'CMP copy — ultra short', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
(@org, 'copy-warm-short', 'CMP copy — warm short', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
(@org, 'copy-general', 'CMP copy — general', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
(@org, 'copy-plain', 'CMP copy — plain', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3)),
(@org, 'copy-privacy-forward', 'CMP copy — privacy-forward', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

-- Resolve preset ids by slug (works after first insert; duplicate slug uses existing row)
SET @p1 := (SELECT `id` FROM `_preset` WHERE (`organization_id` <=> @org) AND `slug` = 'copy-ultra-short' LIMIT 1);
SET @p2 := (SELECT `id` FROM `_preset` WHERE (`organization_id` <=> @org) AND `slug` = 'copy-warm-short' LIMIT 1);
SET @p3 := (SELECT `id` FROM `_preset` WHERE (`organization_id` <=> @org) AND `slug` = 'copy-general' LIMIT 1);
SET @p4 := (SELECT `id` FROM `_preset` WHERE (`organization_id` <=> @org) AND `slug` = 'copy-plain' LIMIT 1);
SET @p5 := (SELECT `id` FROM `_preset` WHERE (`organization_id` <=> @org) AND `slug` = 'copy-privacy-forward' LIMIT 1);

INSERT INTO `_presets_version` (`preset_id`, `version`, `status`, `payload`, `published_at`, `created_at`)
VALUES
(
  @p1,
  1,
  'published',
  JSON_OBJECT(
    'bannerMessageHtml', '<p>We use cookies to run the site, measure traffic, and show relevant content. You can accept all, only what is needed, or change choices anytime.</p>',
    'acceptAllButton', 'Accept all',
    'necessaryButton', 'Only necessary',
    'settingsButton', 'Choices',
    'saveSettingsButton', 'Save choices'
  ),
  CURRENT_TIMESTAMP(3),
  CURRENT_TIMESTAMP(3)
),
(
  @p2,
  1,
  'published',
  JSON_OBJECT(
    'bannerMessageHtml', '<p>Cookies help this site work and help us improve it. Choose Accept all, Only necessary, or open settings to pick each category.</p>',
    'acceptAllButton', 'Allow all',
    'necessaryButton', 'Essential only',
    'settingsButton', 'Manage cookies',
    'saveSettingsButton', 'Save my choices'
  ),
  CURRENT_TIMESTAMP(3),
  CURRENT_TIMESTAMP(3)
),
(
  @p3,
  1,
  'published',
  JSON_OBJECT(
    'bannerMessageHtml', '<p>We use cookies and similar tools for basic functions, statistics, and marketing where allowed. You decide what to allow and can change this later.</p>',
    'acceptAllButton', 'Allow all cookies',
    'necessaryButton', 'Reject non-essential',
    'settingsButton', 'Cookie settings',
    'saveSettingsButton', 'Save settings'
  ),
  CURRENT_TIMESTAMP(3),
  CURRENT_TIMESTAMP(3)
),
(
  @p4,
  1,
  'published',
  JSON_OBJECT(
    'bannerMessageHtml', '<p>We save small files on your device to make the site work and to understand how it is used. Pick what you are OK with below.</p>',
    'acceptAllButton', 'I am OK with all',
    'necessaryButton', 'Only what the site needs',
    'settingsButton', 'Let me choose',
    'saveSettingsButton', 'Save'
  ),
  CURRENT_TIMESTAMP(3),
  CURRENT_TIMESTAMP(3)
),
(
  @p5,
  1,
  'published',
  JSON_OBJECT(
    'bannerMessageHtml', '<p>We respect your privacy. Cookies help the site function and let us measure and improve the experience. Choose an option or adjust details in settings.</p>',
    'acceptAllButton', 'Accept',
    'necessaryButton', 'Decline optional',
    'settingsButton', 'Details',
    'saveSettingsButton', 'Confirm choices'
  ),
  CURRENT_TIMESTAMP(3),
  CURRENT_TIMESTAMP(3)
)
ON DUPLICATE KEY UPDATE
  `status` = VALUES(`status`),
  `payload` = VALUES(`payload`),
  `published_at` = VALUES(`published_at`);
