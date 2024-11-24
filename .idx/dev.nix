# To learn more about how to use Nix to configure your environment
# see: https://developers.google.com/idx/guides/customize-idx-env
{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-23.11"; # or "unstable"
  # Use https://search.nixos.org/packages to find packages
  packages = [ pkgs.sudo pkgs.xdg-utils pkgs.nodejs_20 pkgs.turso-cli ];
  # Sets environment variables in the workspace
  env = {
    ASTRO_DATABASE_FILE = ".astro/content.db";
    GOOGLE_API_KEY = "AIzaSyAWzDZ-qnechchEjGcrNJzXALs8c06iaPk";
    SERPER_API_KEY = "cb46cfefaa5fc47b175b401f390e3f63ebbdf5d0";
    STABILITY_API_KEY = "sk-jcUP3kdcwlQ583D5j2Sctxy29ZrIkWasit5un1CshqOPROLz";
    ASTRO_DB_REMOTE_URL = "libsql://ova-project-gitchaell.turso.io";
    ASTRO_DB_APP_TOKEN = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MjkzODU4MDcsImlkIjoiY2FhYzg0OTMtNGZiMy00NGNkLTg0NGQtZjQ2OTVmMDZlYzIxIn0.k_BLXTSXPp7pVlo3EsLcQKRL83wq768kvyR75q7jXxsXCG4ykcLnE6bY0xbmFtwLi-au2JYuckmCFUhkxun6Dw";
    BLOB_READ_WRITE_TOKEN = "vercel_blob_rw_CCreWTs3K4O0l1pX_BEpNfQ6wXDd84sY7gXMckQ5tA5LwHe";
  };
  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [ "astro-build.astro-vscode" ];
    workspace = {
      # Runs when a workspace is first created with this `dev.nix` file
      onCreate = {
        install = ''
          npm ci --prefer-offline --no-audit --no-progress --timing || npm i --no-audit --no-progress --timing
          yes | npx astro add tailwind'';
        # Open editors for the following files by default, if they exist:
        default.openFiles = [ "src/pages/index.astro" ];
      };
      # To run something each time the workspace is (re)started, use the `onStart` hook
    };
    # Enable previews and customize configuration
    previews = {
      enable = true;
      previews = {
        web = {
          command =
            [ "npm" "run" "dev" "--" "--port" "$PORT" "--hostname" "0.0.0.0" ];
          manager = "web";
        };
      };
    };
  };
}
