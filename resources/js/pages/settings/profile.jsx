import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

import DeleteUser from '@/components/delete-user';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Layout from '@/layouts/layout';
import SettingsLayout from '@/layouts/settings/layout';
import ErrorDisplay from '@/components/ErrorDisplay';
import { CheckCircle, XCircle } from 'lucide-react';

const breadcrumbs = [
    {
        title: 'Profile settings',
        href: '/settings/profile',
    },
];

export default function Profile({ mustVerifyEmail, status }) {
    const { auth, flash } = usePage().props;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        firstname: auth.user.firstname || '',
        lastname: auth.user.lastname || '',
        birthday: auth.user.birthday || '',
        gender: auth.user.gender || '',
        address: auth.user.address || '',
        zip: auth.user.zip || '',
        city: auth.user.city || '',
        phone: auth.user.phone || '',
        email: auth.user.email || '',
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'), {
            preserveScroll: true,
        });
    };

    return (
        <>
        <SettingsLayout>
            <div className="space-y-6 p-5 w-3/4 flex flex-col place-self-center">
                <Head title="Paramètres de profil" />
                <HeadingSmall className="" title="Informations du profil" description="Mettez à jour vos informations personnelles et votre adresse" />
                <ErrorDisplay errors={errors} />
                {flash?.success && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md flex items-center">
                        <CheckCircle className="h-5 w-5 mr-2" />
                        <span>{flash.success}</span>
                    </div>
                )}
                <form onSubmit={submit} className="space-y-6 place-self-center">
                    {/* Prénom */}
                    <div className="grid gap-2">
                        <Label htmlFor="firstname">Prénom</Label>
                        <Input
                            id="firstname"
                            className="mt-1 block w-full"
                            value={data.firstname}
                            onChange={(e) => setData('firstname', e.target.value)}
                            required
                            autoComplete="given-name"
                            placeholder="Votre prénom"
                        />
                        <InputError className="mt-2" message={errors.firstname} />
                    </div>

                    {/* Nom */}
                    <div className="grid gap-2">
                        <Label htmlFor="lastname">Nom</Label>
                        <Input
                            id="lastname"
                            className="mt-1 block w-full"
                            value={data.lastname}
                            onChange={(e) => setData('lastname', e.target.value)}
                            required
                            autoComplete="family-name"
                            placeholder="Votre nom"
                        />
                        <InputError className="mt-2" message={errors.lastname} />
                    </div>

                    {/* Date de naissance */}
                    <div className="grid gap-2">
                        <Label htmlFor="birthday">Date de naissance</Label>
                        <Input
                            id="birthday"
                            type="date"
                            className="mt-1 block w-full"
                            value={data.birthday}
                            onChange={(e) => setData('birthday', e.target.value)}
                            required
                            autoComplete="bday"
                        />
                        <InputError className="mt-2" message={errors.birthday} />
                    </div>

                    {/* Genre */}
                    <div className="grid gap-2">
                        <Label htmlFor="gender">Genre</Label>
                        <select
                            id="gender"
                            className="mt-1 block w-full"
                            value={data.gender}
                            onChange={(e) => setData('gender', e.target.value)}
                            required
                        >
                            <option value="">Sélectionnez votre genre</option>
                            <option value="homme">Homme</option>
                            <option value="femme">Femme</option>
                            <option value="autre">Autre</option>
                        </select>
                        <InputError className="mt-2" message={errors.gender} />
                    </div>

                    {/* Adresse */}
                    <div className="grid gap-2">
                        <Label htmlFor="address">Adresse</Label>
                        <Input
                            id="address"
                            className="mt-1 block w-full"
                            value={data.address}
                            onChange={(e) => setData('address', e.target.value)}
                            required
                            autoComplete="street-address"
                            placeholder="Votre adresse"
                        />
                        <InputError className="mt-2" message={errors.address} />
                    </div>

                    {/* Code postal */}
                    <div className="grid gap-2">
                        <Label htmlFor="zip">Code postal</Label>
                        <Input
                            id="zip"
                            className="mt-1 block w-full"
                            value={data.zip}
                            onChange={(e) => setData('zip', e.target.value)}
                            required
                            autoComplete="postal-code"
                            placeholder="Code postal"
                        />
                        <InputError className="mt-2" message={errors.zip} />
                    </div>

                    {/* Ville */}
                    <div className="grid gap-2">
                        <Label htmlFor="city">Ville</Label>
                        <Input
                            id="city"
                            className="mt-1 block w-full"
                            value={data.city}
                            onChange={(e) => setData('city', e.target.value)}
                            required
                            autoComplete="address-level2"
                            placeholder="Votre ville"
                        />
                        <InputError className="mt-2" message={errors.city} />
                    </div>

                    {/* Téléphone */}
                    <div className="grid gap-2">
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input
                            id="phone"
                            type="tel"
                            className="mt-1 block w-full"
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                            required
                            autoComplete="tel"
                            placeholder="Votre numéro de téléphone"
                        />
                        <InputError className="mt-2" message={errors.phone} />
                    </div>

                    {/* Email */}
                    <div className="grid gap-2">
                        <Label htmlFor="email">Adresse email</Label>
                        <Input
                            id="email"
                            type="email"
                            className="mt-1 block w-full"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                            autoComplete="username"
                            placeholder="Adresse email"
                        />
                        <InputError className="mt-2" message={errors.email} />
                    </div>

                    {mustVerifyEmail && auth.user.email_verified_at === null && (
                        <div>
                            <p className="text-muted-foreground -mt-4 text-sm">
                                Votre adresse email n'est pas vérifiée{' '}
                                <Link
                                    href={route('verification.send')}
                                    method="post"
                                    as="button"
                                    className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                >
                                    Cliquez ici pour renvoyer un mail de vérification.
                                </Link>
                            </p>

                            {status === 'verification-link-sent' && (
                                <div className="mt-2 text-sm font-medium text-green-600">
                                    Un lien de vérification a été envoyé a votre adresse email.
                                </div>
                            )}
                        </div>
                    )}

                    <div className="flex items-center gap-4">
                        <Button disabled={processing}>Enregistrer</Button>

                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-neutral-600">Enregistré!</p>
                        </Transition>
                    </div>
                </form>
            </div>

            {/* <DeleteUser /> */}
        </SettingsLayout>
        </>
    );
}
