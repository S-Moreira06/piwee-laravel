import React from 'react';

const ErrorDisplay = ({ errors }) => {
    // Vérifie s'il y a des erreurs à afficher
    if (!errors || Object.keys(errors).length === 0) {
        return null;
    }

    // Convertit l'objet errors en tableau pour l'affichage
    const errorMessages = Object.values(errors).flat();

    return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong>Oups !</strong> Il y a {errorMessages.length} erreur(s) :
            <ul className="mt-2 list-disc list-inside">
                {errorMessages.map((error, index) => (
                    <li key={index}>{error}</li>
                ))}
            </ul>
        </div>
    );
};

export default ErrorDisplay;
