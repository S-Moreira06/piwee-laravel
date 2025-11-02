import { useInitials } from '@/hooks/use-initials';

/**
 * 👤 UserAvatar Component
 * Affiche un avatar avec les initiales de l'utilisateur
 * 
 * Props:
 * - user: objet utilisateur {firstname, lastname, avatar?}
 * - size: 'sm' | 'md' | 'lg' (optionnel, défaut = 'md')
 * - className: classes CSS supplémentaires
 */
export function UserAvatar({ user, size = 'md', className = '' }) {
    // ✅ Utiliser le hook useInitials
    const getInitials = useInitials();

    // Tailles en pixels
    const sizes = {
        sm: 'h-8 w-8 text-xs',
        md: 'h-10 w-10 text-sm',
        lg: 'h-12 w-12 text-base',
    };

    // Si l'utilisateur a un avatar (image)
    if (user?.avatar) {
        return (
            <img
                src={user.avatar}
                alt={`${user.firstname} ${user.lastname}`}
                className={`rounded-full object-cover ${sizes[size]} ${className}`}
            />
        );
    }

    // Sinon, afficher les initiales
    // ✅ Utiliser le hook pour générer les initiales
    const initials = getInitials(`${user?.firstname || ''} ${user?.lastname || ''}`);

    return (
        <div
            className={`
                flex items-center justify-center rounded-full 
                bg-gradient-to-br from-blue-600 to-blue-700 
                text-white font-bold
                ${sizes[size]} 
                ${className}
            `}
        >
            {initials || '?'}
        </div>
    );
}
