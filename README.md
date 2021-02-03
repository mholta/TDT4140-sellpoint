# SellPoint

## Prerequisites

### Backend

- Python 3.9
- Pipenv

### Frontend

- Node 14.x
- NPM 6.x
- TypeScript 4.1x

## Installation

### Clone repo and install dependencies

```
git clone https://gitlab.stud.idi.ntnu.no/tdt4140/landsby-4/gruppe-57/sellpoint.git
cd backend
pipenv shell
pipenv install
cd ../frontend
npm i
```

You may experience issues using Node 15, so be sure you have version 14.x is sonething's wrong.

### Prettier

We use Prettier as code formatting tool. Install the vscode extension, and turn on `format on save`.

If the documents doesn't gets formatted on save, run a manual format while in a document with:

`cmd`/`ctrl` + `shift`+ `P`

write and select:

`Format Document`

Choose Prettier as formatter. Now it should say `Prettier` with a check-mark down in the right corner of vscode.

## Contributing

We work with changes on a local branch. Strive to have one commit per issue, and one issue per MR.

Master is the default branch were working on.

### Commit message

```
#x: message in imerative
```

e.g.

```
#53: add product image
```

Where x is issue number. All lowercase.

For smaller changes that doesn't need an issue, use:

```
chore: message in imperative
```

### PR name

Same, or close to, commit message.

If one MR containing multiple issues (which we strive to avoid), use `#x/#y`, where x and y are issue numbers.

### Reviewing

At least two persons has to approve MR before merging.

After all comments are resolved, the author can merge the MR.

### Resolving comments

We appen all fixes to the commit instead of making new commits. This way we can keep the commit tree clean. After comment is resolved, commit with:

```
git commit --amend --no-edit
```

If you need to change the commit message use

```
git commit --amend
```

Since the upstream now differs from your local branch, make sure you're on the same branch and use force push.

```
git push -f
```

(use with caution)

### Avoid merge conflicts

If you are working on a branch, and another MR has been pushed before you're able to push, we rebase on master before we push to avoid any conflicts.

1. Commit changes in feature-branch
2. Checkout to develop
3. Pull latest changes
4. Checkout to feature-branch
5. `git rebase develop`

This can result in Merge Conflicts. If this happens, just resolve the conflict, save, and stage the file. You don't need to change the commit message if it isn't necessary. Then

```
git rebase --continue
```

You can also abort the rebase if you wish, with

```
git rebase --abort
```

### Merge

We use rebase and merge strategy. This way we get a clean commit history. Branch is deleted upon merge, while your local is not.
