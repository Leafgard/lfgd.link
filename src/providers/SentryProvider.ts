import * as Sentry from '@sentry/node';
import appConfig from "../config/app.config";

export function runSentry() {
    return Sentry.init({
        dsn: appConfig.SENTRY_DSN
    })
}