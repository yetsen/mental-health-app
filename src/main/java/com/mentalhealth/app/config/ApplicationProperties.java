package com.mentalhealth.app.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Properties specific to Survey Chart App.
 * <p>
 * Properties are configured in the {@code application.yml} file.
 * See {@link io.github.jhipster.config.JHipsterProperties} for a good example.
 */
@ConfigurationProperties(prefix = "application", ignoreUnknownFields = false)
public class ApplicationProperties {
    private final ApplicationProperties.Mail mail = new ApplicationProperties.Mail();

    public ApplicationProperties.Mail getMail() {
        return this.mail;
    }

    public static class Mail {
        private String fromName = "";

        public Mail() {
        }

        public String getFromName () {
            return fromName;
        }

        public void setFromName (String fromName) {
            this.fromName = fromName;
        }
    }
}
