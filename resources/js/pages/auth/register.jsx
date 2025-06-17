import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import ErrorDisplay from '@/components/ErrorDisplay';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        firstname: 'Test',
        lastname: 'Test',
        birthday: '',
        gender: '',
        address: '21 rue du test',
        zip: '06400',
        city: 'Cannes',
        phone: '0606060606',
        email: 'test@mail.fr',
        password: 'Azerty06!',
        password_confirmation: 'Azerty06!',
    });


    const submit = (e) => {
        e.preventDefault();
        post(route('auth.register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout title="Créez votre compte" description="Et profitez de nos offres exclusives !">
            <Head title="Inscription" />
            <ErrorDisplay errors={errors} />
            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="firstname">Nom</Label>
                        <Input
                            id="firstname"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="firstname"
                            value={data.firstname}
                            onChange={(e) => setData('firstname', e.target.value)}
                            disabled={processing}
                            placeholder="Nom"
                        />
                        {errors.firstname&& 
                        <div role="alert" className="alert alert-error">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{errors.firstname}</span>
                            </div>}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="lastname">Prénom</Label>
                        <Input
                            id="lastname"
                            type="text"
                            required
                            tabIndex={2}
                            autoComplete="lastname"
                            value={data.lastname}
                            onChange={(e) => setData('lastname', e.target.value)}
                            disabled={processing}
                            placeholder="Prénom"
                        />
                        {errors.lastname&& 
                        <div role="alert" className="alert alert-error">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{errors.lastname}</span>
                            </div>}
                    </div>
                     <div>
                        <Label htmlFor="birthday">Date de naissance</Label>
                        <Input
                            id="birthday"
                            type="date"
                            required
                            tabIndex={3}
                            autoComplete="birthday"
                            value={data.birthday}
                            className="mt-1"
                            onChange={(e) => setData('birthday', e.target.value)}
                        />
                        {errors.birthday&& 
                        <div role="alert" className="alert alert-error">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{errors.birthday}</span>
                        </div>}
                    </div>
                     <div>
                        <Label htmlFor="gender">Genre</Label>
                        <select
                            id="gender"
                            value={data.gender}
                            className="mt-1"
                            tabIndex={4}
                            onChange={(e) => setData('gender', e.target.value)}
                            required
                        >
                            <option value="">Sélectionnez</option>
                            <option value="homme">Homme</option>
                            <option value="femme">Femme</option>
                            <option value="autre">Autre</option>
                        </select>
                        {errors.gender&& 
                        <div role="alert" className="alert alert-error">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{errors.gender}</span>
                        </div>}
                    </div>
                    <div>
                        <Label htmlFor="address">Adresse</Label>
                        <Input
                            id="address"
                            type="text"
                            tabIndex={5}
                            value={data.address}
                            className="mt-1"
                            onChange={(e) => setData('address', e.target.value)}
                            required
                        />
                        {errors.address&& 
                        <div role="alert" className="alert alert-error">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{errors.address}</span>
                        </div>}
                    </div>
                    {/* Code postal */}
                    <div>
                        <Label htmlFor="zip">Code postal</Label>
                        <Input
                            id="zip"
                            type="text"
                            value={data.zip}
                            className="mt-1"
                            onChange={(e) => setData('zip', e.target.value)}
                            required
                        />
                        {errors.zip&& 
                        <div role="alert" className="alert alert-error">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{errors.zip}</span>
                        </div>}
                    </div>

                    {/* Ville */}
                    <div>
                        <Label htmlFor="city">Ville</Label>
                        <Input
                            id="city"
                            type="text"
                            value={data.city}
                            className="mt-1"
                            onChange={(e) => setData('city', e.target.value)}
                            required
                        />
                        {errors.city&& 
                        <div role="alert" className="alert alert-error">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{errors.city}</span>
                        </div>}
                    </div>

                    {/* Téléphone */}
                    <div>
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input
                            id="phone"
                            type="tel"
                            value={data.phone}
                            className="mt-1"
                            onChange={(e) => setData('phone', e.target.value)}
                            required
                        />
                        {errors.phone&& 
                        <div role="alert" className="alert alert-error">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{errors.phone}</span>
                        </div>}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Adresse email</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            tabIndex={2}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            disabled={processing}
                            placeholder="email@exemple.com"
                        />
                        {errors.email&& 
                        <div role="alert" className="alert alert-error">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{errors.email}</span>
                        </div>
                        }
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">Mot de passe</Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={3}
                            autoComplete="new-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            disabled={processing}
                            placeholder="Mot de passe"
                        />
                        {errors.password&& 
                        <div role="alert" className="alert alert-error">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{errors.password}</span>
                        </div>
                        }
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">Confirmation du Mot de passe</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            required
                            tabIndex={4}
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            disabled={processing}
                            placeholder="Confirmation du Mot de passe"
                        />
                        {errors.password_confirmation&& 
                        <div role="alert" className="alert alert-error">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{errors.password_confirmation}</span>
                        </div>
                        }
                    </div>

                    <Button type="submit" className="mt-2 w-full" tabIndex={5} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Créeer un compte
                    </Button>
                </div>

                <div className="text-muted-foreground text-center text-sm">
                    <p>
                        Vous avez déjà un compte?{' '}
                    </p>
                    <TextLink href={route('auth.login')} tabIndex={6}>
                        Connexion
                    </TextLink>
                </div>
            </form>
        </AuthLayout>
    );
}
