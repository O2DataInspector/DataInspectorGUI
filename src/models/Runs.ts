export interface Build {
  id: string;
  url: string;
  name: string;
  branch: string;
}

export interface Run {
  id: string;
  status: string;
  config: string;
  workflow: string;
  build: Build;
}

export interface Runs {
  runs: Run[];
}
