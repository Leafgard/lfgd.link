import * as jf from 'joiful'
import { getMongoRepository } from 'typeorm'
import { nanoid } from 'nanoid'
import slugify from 'slugify'

import { Link } from '../entity'

import appConfig from '../config/app.config'
import { CreateLinkValidation, GetLinkValidation } from "../validation/LinkValidation";

/**
 * Creates a link
 * @param linkValidation Customer link schema
 */
export async function createLink(linkValidation: CreateLinkValidation) {
    // Validate link
    const { error } = await jf.validateAsClass(linkValidation, CreateLinkValidation)
    if (error) throw new Error(error.message)

    // Create the link
    const link = new Link()
    link.url = linkValidation.url
    link.slug = (
        slugify(linkValidation.slug, appConfig.SLUFIGY_OPTIONS) || nanoid(6)
    ).toLowerCase()
    link.createdAt = new Date()

    const linkRepository = getMongoRepository(Link)
    const isUrlExisting = await linkRepository.findOne(link)

    if (!isUrlExisting) {
        // Save the link
        const { slug } = await linkRepository.save(link)
        return {
            message: 'Link successfully created. 🔗',
            link: {
                url: 'lfgd.link',
                slug
            }
        }
    } else {
        // Slug already in use
        return {
            status: 403,
            error: 'Slug in use. 🐌'
        }
    }
}

/**
 * Retrieves a link
 * @param slugValidation Customer slug schema
 */
export async function getLink(slugValidation: GetLinkValidation) {
    // Validate slug
    const { error } = await jf.validateAsClass(slugValidation, GetLinkValidation)
    if (error) throw new Error(error.message)

    const { slug } = slugValidation
    const linkRepository = getMongoRepository(Link)
    const link = await linkRepository.findOne({ slug })

    if (link) {
        // Returns corresponding link
        return {
            message: 'Link existing. 🔗',
            link
        }
    } else {
        // No such slug
        return {
            status: 404,
            error: 'No such slug. ❓'
        }
    }
}