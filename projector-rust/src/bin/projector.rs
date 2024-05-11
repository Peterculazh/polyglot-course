use anyhow::Result;
use clap::Parser;
use projector_rust::{
    config::{Config, Operation},
    opts::Opts,
    projector::Projector,
};

fn main() -> Result<()> {
    let config: Config = Opts::parse().try_into()?;
    let mut proj = Projector::from_config(config.config, config.pwd);

    match config.operation {
        Operation::Print(None) => {
            let data = proj.get_value_all();
            let data = serde_json::to_string(&data)?;

            println!("{}", data);
        }
        Operation::Print(Some(k)) => {
            proj.get_value(&k).map(|x| {
                println!("{}", x);
            });
        }
        Operation::Add(key, value) => {
            proj.set_value(key, value);
            proj.save()?;
        }
        Operation::Remove(key) => {
            proj.remove_value(&key);
            proj.save()?;
        }
    }

    return Ok(());
}
