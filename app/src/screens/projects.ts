import {newInstanceOf} from '@aurelia/kernel';

// Local modules.
import {Request, Response} from '../lib/http';
import {Storage}           from '../lib/storage';
import {openExtBrowser}    from '../lib/utils';

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
  public title = 'Projects';
  public repos: ProjectRepo[];

  public openExternal = openExtBrowser;

  constructor(@newInstanceOf(Request) private request: Request) {}

  /**
   * @inheritdoc
   */
  async created() {
    let repos: ProjectRepo[] = await Storage.get('projects');

    // Query data from Github API
    if (!repos) {
      const res: Response = await this.request.get('https://api.github.com/users/nuxy/repos?sort=pushed');
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
      await Storage.set('projects', repos);
    }

    // Limit results to 10 items.
    this.repos = repos.slice(0, 10);
  }
}
