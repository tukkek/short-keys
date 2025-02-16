# Short Keys

This is a non-privileged utility that allows users to set-up commands to be executed in response to key-strokes. These commands will only ever run in the proper window-context.

Short Keys is meant to be simple yet powerful; run in unpriviliged mode; be context-aware by default; have a single small configuration file; and be restart-less. Its "configure once and forget" approach doesn't require launching before use and is transparent, with no interface.

## Requirements

Currently only UNIX systems are supported. Also required:

1. Deno https://deno.com/.
2. `xdotool` (Linux) or `osxdotool` (Mac).

## Configuration

### JSON

The `commands.json` configuration file is structured as:

```json
{
  "Application":{
    "a":"/path/to/command",
    "b":["/usr/bin/echo","a composite command"],
  },
  "Another application":{
    "c":"/path/to/command argument1 argument2",
  },
}
```

The application name is in most cases the same as seen on the window title (as shown by `xdotool getactivewindow getwindowname`). Literal partial matches are allowed for convenience.

The commands to be executed can be provided as either a simple string or as a list of strings. In general any command that you'd need quotes for in a terminal should use the second-form.

### System

Since Short Keys is unpriviliged and has no access to system events you will need to set-it-up using your system's configuration. You should be able to do that via any settings-manager that lets you bind short-cut keys to launch programs. Consult you system's documentation.

For example: set the *a* key to run `/path/to/shortkeys/press.js a`; or *Control A* to `/path/to/shortkeys/press.js ^a` . Arguments will match JSON keys and can be named to your liking.

You can also pass multiple arguments to be executed in sequence in the order they are provided. This can be helpful if you want to perform some simple synchronization (for example binding *c* to `/path/to/shortkeys/press.js c1 c2 c3` to execute 3 commands in sequence).

If your system doesn't allow scripts to be run directly, you may have to use instead: `/path/to/deno --allow-read --allow-run /path/to/shortkeys/press.js` (or the shorter `--allow-all`).

## See also

``xdotool` can emulate every typical IO operation such as keyboard and mouse actions. You can leverage this for common key-remapping use-cases in your commands. Read its documentation for more details: https://github.com/jordansissel/xdotool/blob/master/xdotool.pod.

There are other key-mapying tools that run in priviliged mode but they can have their own usability down-sides. They are however more user-friendly if you don't mind those!

For Windows: https://www.autohotkey.com/.

For Linux: https://github.com/sezanzeb/input-remapper.
