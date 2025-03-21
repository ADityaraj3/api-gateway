import * as fs from 'fs';

export const serverUtil = {
  boot: async () =>
    new Promise<void>(async (resolve, reject) => {
      const bootDirPath = `${__dirname}/../../boot`;

      const files = await fs.readdirSync(bootDirPath);

      for (const file of files) {
        try {
          console.log(`${bootDirPath}/${file}`);
          const module = require(`${bootDirPath}/${file}`);
          if (
            module &&
            module.default &&
            typeof module.default === 'function'
          ) {
            await module.default(); // Execute the function when the module is imported
          }
        } catch (e) {
          return reject(e);
        }
      }
      resolve();
    }),
};
