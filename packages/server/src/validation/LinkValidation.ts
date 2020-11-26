import * as jf from 'joiful';

export class CreateLinkValidation {
    @jf
        .string()
        .required()
        .max(255)
    url: string

    @jf
        .string()
        .min(6)
        .max(16)
    slug: string
}

export class GetLinkValidation {
    @jf
        .string()
        .required()
        .min(6)
        .max(16)
    slug: string
}