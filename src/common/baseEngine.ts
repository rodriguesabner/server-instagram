import axios from 'axios';
import {
  ClientProps, ConfigProps, Container,
} from '../interfaces/container.interface';

class BaseEngine {
  public sessions: any;

  public ig: any;

  private config: ConfigProps;

  constructor(opts: Container) {
    this.sessions = opts.sessions;
    this.config = opts.config;
  }

  getClient(session: string): ClientProps {
    const copySession: any = this.sessions;
    const client: ClientProps = copySession[session];

    if (!client) {
      copySession[session] = {
        session,
        status: null,
      };

      return copySession[session];
    }

    return client;
  }

  callWebHook(client: ClientProps, event: string, data: any) {
    const { session } = client;

    if (this.config.webhook.active) {
      const url = `${this.config.webhook.url}?session=${session}&&event=${event}`;
      axios.post(url, data);
    }
  }
}

export default BaseEngine;
