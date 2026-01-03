import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
 * @see routes/web.php:19
 * @route '/demo/restaurant'
 */
export const restaurant = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: restaurant.url(options),
    method: 'get',
})

restaurant.definition = {
    methods: ["get","head"],
    url: '/demo/restaurant',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:19
 * @route '/demo/restaurant'
 */
restaurant.url = (options?: RouteQueryOptions) => {
    return restaurant.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:19
 * @route '/demo/restaurant'
 */
restaurant.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: restaurant.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:19
 * @route '/demo/restaurant'
 */
restaurant.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: restaurant.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:19
 * @route '/demo/restaurant'
 */
    const restaurantForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: restaurant.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:19
 * @route '/demo/restaurant'
 */
        restaurantForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: restaurant.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:19
 * @route '/demo/restaurant'
 */
        restaurantForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: restaurant.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    restaurant.form = restaurantForm
/**
 * @see routes/web.php:20
 * @route '/demo/reservation'
 */
export const reservation = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reservation.url(options),
    method: 'get',
})

reservation.definition = {
    methods: ["get","head"],
    url: '/demo/reservation',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:20
 * @route '/demo/reservation'
 */
reservation.url = (options?: RouteQueryOptions) => {
    return reservation.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:20
 * @route '/demo/reservation'
 */
reservation.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reservation.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:20
 * @route '/demo/reservation'
 */
reservation.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: reservation.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:20
 * @route '/demo/reservation'
 */
    const reservationForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: reservation.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:20
 * @route '/demo/reservation'
 */
        reservationForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: reservation.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:20
 * @route '/demo/reservation'
 */
        reservationForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: reservation.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    reservation.form = reservationForm
/**
 * @see routes/web.php:21
 * @route '/demo/ecommerce'
 */
export const ecommerce = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ecommerce.url(options),
    method: 'get',
})

ecommerce.definition = {
    methods: ["get","head"],
    url: '/demo/ecommerce',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:21
 * @route '/demo/ecommerce'
 */
ecommerce.url = (options?: RouteQueryOptions) => {
    return ecommerce.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:21
 * @route '/demo/ecommerce'
 */
ecommerce.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ecommerce.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:21
 * @route '/demo/ecommerce'
 */
ecommerce.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ecommerce.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:21
 * @route '/demo/ecommerce'
 */
    const ecommerceForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: ecommerce.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:21
 * @route '/demo/ecommerce'
 */
        ecommerceForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ecommerce.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:21
 * @route '/demo/ecommerce'
 */
        ecommerceForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ecommerce.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    ecommerce.form = ecommerceForm
/**
 * @see routes/web.php:22
 * @route '/demo/clinic'
 */
export const clinic = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: clinic.url(options),
    method: 'get',
})

clinic.definition = {
    methods: ["get","head"],
    url: '/demo/clinic',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:22
 * @route '/demo/clinic'
 */
clinic.url = (options?: RouteQueryOptions) => {
    return clinic.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:22
 * @route '/demo/clinic'
 */
clinic.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: clinic.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:22
 * @route '/demo/clinic'
 */
clinic.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: clinic.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:22
 * @route '/demo/clinic'
 */
    const clinicForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: clinic.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:22
 * @route '/demo/clinic'
 */
        clinicForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: clinic.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:22
 * @route '/demo/clinic'
 */
        clinicForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: clinic.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    clinic.form = clinicForm
/**
 * @see routes/web.php:23
 * @route '/demo/admin'
 */
export const admin = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: admin.url(options),
    method: 'get',
})

admin.definition = {
    methods: ["get","head"],
    url: '/demo/admin',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:23
 * @route '/demo/admin'
 */
admin.url = (options?: RouteQueryOptions) => {
    return admin.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:23
 * @route '/demo/admin'
 */
admin.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: admin.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:23
 * @route '/demo/admin'
 */
admin.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: admin.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:23
 * @route '/demo/admin'
 */
    const adminForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: admin.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:23
 * @route '/demo/admin'
 */
        adminForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: admin.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:23
 * @route '/demo/admin'
 */
        adminForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: admin.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    admin.form = adminForm
/**
 * @see routes/web.php:24
 * @route '/demo/gaming'
 */
export const gaming = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: gaming.url(options),
    method: 'get',
})

gaming.definition = {
    methods: ["get","head"],
    url: '/demo/gaming',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:24
 * @route '/demo/gaming'
 */
gaming.url = (options?: RouteQueryOptions) => {
    return gaming.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:24
 * @route '/demo/gaming'
 */
gaming.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: gaming.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:24
 * @route '/demo/gaming'
 */
gaming.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: gaming.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:24
 * @route '/demo/gaming'
 */
    const gamingForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: gaming.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:24
 * @route '/demo/gaming'
 */
        gamingForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: gaming.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:24
 * @route '/demo/gaming'
 */
        gamingForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: gaming.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    gaming.form = gamingForm
const demo = {
    restaurant: Object.assign(restaurant, restaurant),
reservation: Object.assign(reservation, reservation),
ecommerce: Object.assign(ecommerce, ecommerce),
clinic: Object.assign(clinic, clinic),
admin: Object.assign(admin, admin),
gaming: Object.assign(gaming, gaming),
}

export default demo