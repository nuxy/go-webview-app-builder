import {newInstanceOf} from '@aurelia/kernel';

// Local modules.
import {AppRequest, AppResponse} from '../webview/http';
import {AppStorage}              from '../webview/storage';
import {openExtBrowser}          from '../webview/utils';

type GithubRepo = {
  [T: string]: string
}

type ProjectRepo = {
  name: string,
  url: string,
  language: string,
  updated: string
};

export class Projects {
  public title = 'Remote source';

  public repos: ProjectRepo[];

  public openExternal = openExtBrowser;

  constructor(@newInstanceOf(AppRequest) private request: AppRequest) {}

  /**
   * @inheritdoc
   */
  async created() {
    let repos: ProjectRepo[] = await AppStorage.get('projects');

    // Query data from Github API
    if (!repos) {
      const res: AppResponse = await this.request.get('https://api.github.com/users/nuxy/repos?sort=pushed');
      const body: GithubRepo[] = JSON.parse(res.Body);

      // .. parse values
      repos = body.map(function(repo: GithubRepo) {
        return {
          name: repo.name,
          url: repo.html_url,
          language: repo.language,
          updated: repo.updated_at
        };
      });

      // .. and cache locally.
      await AppStorage.set('projects', repos);
    }

    // Limit results to 8 items.
    this.repos = repos.slice(0, 8);
  }
}
