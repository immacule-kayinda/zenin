# Administration Zenin

Espace `/admin` pour gérer le catalogue et les commandes (devis) via MongoDB.

## Variables d'environnement

Copiez `.env.example` vers `.env.local` et renseignez :

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | Chaîne de connexion MongoDB |
| `MONGODB_DB` | Nom de la base (défaut : `zenin`) |
| `ADMIN_PASSWORD` | Mot de passe de connexion admin |
| `SEED_SECRET` | Secret pour l'import initial des produits |
| `ORDER_WEBHOOK_URL` | (optionnel) Webhook appelé à chaque commande |

## Premier démarrage

1. Démarrez MongoDB en local ou utilisez MongoDB Atlas.
2. Lancez le site : `npm run dev`
3. Importez le catalogue statique (une seule fois, si la collection est vide) :

```bash
curl -X POST "http://localhost:3000/api/seed?secret=VOTRE_SEED_SECRET"
```

Ou avec en-tête :

```bash
curl -X POST http://localhost:3000/api/seed \
  -H "Authorization: Bearer VOTRE_SEED_SECRET"
```

4. Ouvrez [http://localhost:3000/admin/login](http://localhost:3000/admin/login) et connectez-vous avec `ADMIN_PASSWORD`.

## Parcours admin

- **Tableau de bord** (`/admin`) — statistiques et raccourcis
- **Produits** (`/admin/produits`) — liste, création, édition, suppression
- **Commandes** (`/admin/commandes`) — liste des demandes de devis, marquer comme traitée

Les pages publiques lisent MongoDB lorsque la base contient des produits ; sinon le fichier `lib/products.ts` sert de repli (pratique sans base en local).

## Commandes côté public

Le formulaire sur `/commander` enregistre chaque demande dans la collection `orders` (statut `pending`). Le webhook optionnel reste supporté.

## Sécurité

- Ne commitez jamais `.env` / `.env.local`
- Utilisez des mots de passe forts en production
- `SEED_SECRET` ne doit être utilisé qu'une fois pour l'import initial
