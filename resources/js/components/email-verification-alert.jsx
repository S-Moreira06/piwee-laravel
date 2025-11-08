import { usePage, router } from '@inertiajs/react';
import { AlertCircle, X } from 'lucide-react';
import { useState } from 'react';

export default function EmailVerificationAlert() {
    const { auth } = usePage().props;
    const [dismissed, setDismissed] = useState(false);

    // ✅ Afficher l'alerte seulement si :
    // 1. L'utilisateur est authentifié
    // 2. Son email n'est pas vérifié
    // 3. L'alerte n'a pas été fermée
    if (!auth?.user || auth.user.email_verified_at || dismissed) {
        return null;
    }

    const handleVerify = () => {
        router.visit(route('verification.notice'));
    };

    const handleDismiss = () => {
        setDismissed(true);
    };

    return (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 shadow-sm">
            <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                        <h3 className="text-sm font-medium text-yellow-800">
                            Vérifiez votre adresse email
                        </h3>
                        <p className="mt-1 text-sm text-yellow-700">
                            Votre compte n'est pas encore validé. Veuillez vérifier votre email pour activer votre compte.
                        </p>
                        <button
                            onClick={handleVerify}
                            className="mt-2 inline-block text-sm font-medium text-yellow-600 hover:text-yellow-700 underline"
                        >
                            Vérifier maintenant
                        </button>
                    </div>
                </div>
                <button
                    onClick={handleDismiss}
                    className="text-yellow-400 hover:text-yellow-600 flex-shrink-0"
                    aria-label="Fermer"
                >
                    <X className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
}
