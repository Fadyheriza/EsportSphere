class RequestQueue {
  constructor() {
      this.queue = [];
      this.isProcessing = false;
      this.delay = 3000; // 3 seconds delay
  }

  add(request) {
      this.queue.push(request);
      this.processQueue();
  }

  async processQueue() {
      if (this.isProcessing) return;
      this.isProcessing = true;

      while (this.queue.length > 0) {
          const request = this.queue.shift();
          try {
              await request();
          } catch (error) {
              console.error('Error processing request:', error);
          }
          await new Promise(resolve => setTimeout(resolve, this.delay));
      }

      this.isProcessing = false;
  }
}

const requestQueue = new RequestQueue();
export default requestQueue;
